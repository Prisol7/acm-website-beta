import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

const BOARD_COLLECTION = "acm_board";
const BOARD_DOC_ID = "2026";

// Matched by keyword (not exact string) since the role text stored in Firestore
// varies slightly year to year (e.g. "Vp of Internal Affairs").
const EXEC_ROLE_ORDER = [
  (role) => /president/i.test(role) && !/internal|external/i.test(role),
  (role) => /internal/i.test(role),
  (role) => /external/i.test(role),
  (role) => /treasurer/i.test(role),
  (role) => /mentorship/i.test(role),
  (role) => /secretary/i.test(role),
];

const isProjectManager = (role) => /project manager/i.test(role || "");
const isWebMaster = (role) => /web ?master/i.test(role || "");
const isProjectRole = (role) => /project/i.test(role || "");
const isWebRole = (role) => /web/i.test(role || "");

function execRoleRank({ role }) {
  const rank = EXEC_ROLE_ORDER.findIndex((matches) => matches(role || ""));
  return rank === -1 ? EXEC_ROLE_ORDER.length : rank;
}

function byExecRoleOrder(a, b) {
  return execRoleRank(a) - execRoleRank(b);
}

function toMember({ first, last, position, img } = {}) {
  return {
    role: position,
    name: [first, last].filter(Boolean).join(" "),
    img: img || null,
  };
}

function isMemberEntry(entry) {
  return (
    entry &&
    typeof entry === "object" &&
    !Array.isArray(entry) &&
    ("first" in entry || "last" in entry || "position" in entry)
  );
}

// A group entry can be a single member object, an array of members, or a
// nested map keyed by sub-team then number (`committee.project.0`, …) —
// recurse until we land on member-shaped leaves.
function flattenEntry(entry) {
  if (!entry) return [];
  if (Array.isArray(entry)) return entry.flatMap(flattenEntry);
  if (isMemberEntry(entry)) return [toMember(entry)];
  return Object.values(entry).flatMap(flattenEntry);
}

// Committee sub-teams are keyed inconsistently in Firestore (`Project`, `web`, …),
// so look the group up case-insensitively rather than assuming a casing.
function committeeGroup(committee, name) {
  const key = Object.keys(committee || {}).find((k) => k.toLowerCase() === name);
  return key ? flattenEntry(committee[key]) : [];
}

// Fetches the leaders doc once and splits it into the four sections shown on
// the board page. Project Manager and Web Master live in Firestore under
// `leaders.board` alongside the rest of the exec board, and project/web
// officers live in a flat `leaders.officers` map, so both are pulled out by
// role keyword and merged in as each team's lead/officers.
export async function getLeaders() {
  const snap = await getDoc(doc(db, BOARD_COLLECTION, BOARD_DOC_ID));
  const leaders = snap.exists() ? snap.data().leaders || {} : {};

  const boardMembers = flattenEntry(leaders.board);
  const officers = flattenEntry(leaders.officers);
  const committee = leaders.committee || {};

  const executive = boardMembers
    .filter((m) => !isProjectManager(m.role) && !isWebMaster(m.role))
    .sort(byExecRoleOrder);
  const projectManager = boardMembers.filter((m) => isProjectManager(m.role));
  const webMaster = boardMembers.filter((m) => isWebMaster(m.role));

  return {
    executive,
    projectTeam: [
      ...projectManager,
      ...officers.filter((m) => isProjectRole(m.role)),
      ...committeeGroup(committee, "project"),
    ],
    webTeam: [
      ...webMaster,
      ...officers.filter((m) => isWebRole(m.role)),
      ...committeeGroup(committee, "web"),
    ],
    advisors: flattenEntry(leaders.advisors),
  };
}
