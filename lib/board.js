import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

const BOARD_COLLECTION = "acm_board";
const BOARD_DOC_ID = "2026";

// Matched by keyword (not exact string) since the role text stored in Firestore
// varies slightly year to year (e.g. "Vp of Internal Affairs").
const BOARD_ROLE_ORDER = [
  (role) => /president/i.test(role) && !/internal|external/i.test(role),
  (role) => /internal/i.test(role),
  (role) => /external/i.test(role),
  (role) => /secretary/i.test(role),
  (role) => /treasurer/i.test(role),
  (role) => /project manager/i.test(role),
  (role) => /mentorship/i.test(role),
  (role) => /web ?master/i.test(role),
];

function boardRoleRank({ role }) {
  const rank = BOARD_ROLE_ORDER.findIndex((matches) => matches(role || ""));
  return rank === -1 ? BOARD_ROLE_ORDER.length : rank;
}

function byBoardRoleOrder(a, b) {
  return boardRoleRank(a) - boardRoleRank(b);
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

// A group entry can be a single member object (`board`), an array of members,
// or a nested map keyed by sub-team then number (`committee.Project.0`,
// `committee.web.0`, …) — recurse until we land on member-shaped leaves.
function flattenEntry(entry) {
  if (!entry) return [];
  if (Array.isArray(entry)) return entry.flatMap(flattenEntry);
  if (isMemberEntry(entry)) return [toMember(entry)];
  return Object.values(entry).flatMap(flattenEntry);
}

function flattenGroup(group) {
  if (!group) return [];
  return flattenEntry(group);
}

const COMMITTEE_ORDER = ["project", "web", "design"];

function committeeRank(key) {
  const rank = COMMITTEE_ORDER.indexOf(key.toLowerCase());
  return rank === -1 ? COMMITTEE_ORDER.length : rank;
}

// Splits `committee` into its sub-teams (Project, web, design, …) instead of
// flattening everyone into one list, keyed and ordered by COMMITTEE_ORDER.
function groupCommittee(committee) {
  if (!committee) return [];
  return Object.entries(committee)
    .map(([key, value]) => ({
      key,
      label: `${key.charAt(0).toUpperCase()}${key.slice(1)}`,
      members: flattenEntry(value),
    }))
    .filter((group) => group.members.length > 0)
    .sort((a, b) => committeeRank(a.key) - committeeRank(b.key));
}

// Fetches the leaders doc once and splits it into board / officers / committee / advisors groups.
export async function getLeaders() {
  const snap = await getDoc(doc(db, BOARD_COLLECTION, BOARD_DOC_ID));
  const leaders = snap.exists() ? snap.data().leaders || {} : {};

  return {
    board: flattenGroup(leaders.board).sort(byBoardRoleOrder),
    officers: flattenGroup(leaders.officers),
    committee: groupCommittee(leaders.committee),
    advisors: flattenGroup(leaders.advisors),
  };
}
