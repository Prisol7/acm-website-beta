import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const BOARD_COLLECTION = "acm_board";
export const DEFAULT_BOARD_DOC_ID = "2026";

// Matched by keyword (not exact string) since the role text stored in Firestore
// varies slightly year to year (e.g. "Vp of Internal Affairs").
const EXEC_ROLE_ORDER = [
  (role) => /president/i.test(role) && !/internal|external|vice/i.test(role),
  (role) => /vice/i.test(role) && /president/i.test(role) && !/internal|external/i.test(role),
  (role) => /secretary/i.test(role),
  (role) => /treasurer/i.test(role),
  (role) => /internal/i.test(role),
  (role) => /external/i.test(role),
  (role) => /mentorship/i.test(role),
];

// Faculty advisors are always shown Executive, then Faculty, then Senior.
const ADVISOR_ROLE_ORDER = [
  (role) => /executive/i.test(role),
  (role) => /faculty/i.test(role),
  (role) => /senior/i.test(role),
];

const isProjectManager = (role) => /project manager/i.test(role || "");
const isWebMaster = (role) => /web ?master/i.test(role || "");
const isProjectRole = (role) => /project/i.test(role || "");
const isWebRole = (role) => /web/i.test(role || "");
const isCoordinatingRole = (role) => /coordinat/i.test(role || "");
const isAdministrativeRole = (role) => /administrat/i.test(role || "");
const isFinanceRole = (role) => /finance/i.test(role || "");
// Matches the "Executive Officer" position in `leaders.officers`, distinct
// from the elected exec board (president, VP, etc.) pulled from `leaders.board`.
const isExecutiveOfficerRole = (role) => /executive/i.test(role || "");

// Display-only relabeling — the roles stored in Firestore keep their
// original names so we don't have to touch the database every year.
const ROLE_DISPLAY_OVERRIDES = [
  { matches: (role) => /web ?master/i.test(role), label: "Web Development Director" },
  { matches: (role) => /secretary/i.test(role), label: "Administration Director" },
  { matches: (role) => /treasurer/i.test(role), label: "Finance Director" },
  { matches: (role) => /mentorship/i.test(role), label: "Mentorship Coordinator" },
  { matches: (role) => /web committee/i.test(role), label: "Web Officer" },
];

function displayRole(role) {
  const override = ROLE_DISPLAY_OVERRIDES.find(({ matches }) => matches(role || ""));
  return override ? override.label : role;
}

// Firestore only has a partial name on file for this person — hard-coded
// here rather than fixing the record so it doesn't get overwritten.
const NAME_OVERRIDES = [
  { matches: (role) => /secretary/i.test(role), name: "Arturo Moreno-Fuentes" },
];

function displayName(role, name) {
  const override = NAME_OVERRIDES.find(({ matches }) => matches(role || ""));
  return override ? override.name : name;
}

function execRoleRank({ role }) {
  const rank = EXEC_ROLE_ORDER.findIndex((matches) => matches(role || ""));
  return rank === -1 ? EXEC_ROLE_ORDER.length : rank;
}

function byExecRoleOrder(a, b) {
  return execRoleRank(a) - execRoleRank(b);
}

function advisorRoleRank({ role }) {
  const rank = ADVISOR_ROLE_ORDER.findIndex((matches) => matches(role || ""));
  return rank === -1 ? ADVISOR_ROLE_ORDER.length : rank;
}

function byAdvisorRoleOrder(a, b) {
  return advisorRoleRank(a) - advisorRoleRank(b);
}

// Board titles in Firestore aren't consistently capitalized (e.g. "secretary",
// "vp of internal affairs") — normalize every word to Title Case for display.
function capitalizeWords(str) {
  return (str || "")
    .split(" ")
    .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : word))
    .join(" ");
}

function toMember({ first, last, position, img } = {}) {
  return {
    role: capitalizeWords(position),
    name: [first, last].filter(Boolean).join(" "),
    img: img || null,
  };
}

// Applied last, after every role-keyword match (ordering, section
// filtering) has already run against the raw Firestore role text.
function withDisplayRoles(members) {
  return members.map((m) => ({ ...m, role: displayRole(m.role), name: displayName(m.role, m.name) }));
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
// recurse until we land on member-shaped leaves. Older boards also nest
// members under `{ role_group, members: [...] }` wrappers, which fall
// through to the same generic object recursion below.
function flattenEntry(entry) {
  if (!entry) return [];
  if (Array.isArray(entry)) return entry.flatMap(flattenEntry);
  if (isMemberEntry(entry)) return [toMember(entry)];
  // A leaf string/number (e.g. a "role_group" label) isn't a nested group —
  // recursing into it via Object.values would walk its characters forever.
  if (typeof entry !== "object") return [];
  return Object.values(entry).flatMap(flattenEntry);
}

// Committee sub-teams are keyed inconsistently in Firestore (`Project`, `web`, …),
// so look the group up case-insensitively rather than assuming a casing.
function committeeGroup(committee, name) {
  const key = Object.keys(committee || {}).find((k) => k.toLowerCase() === name);
  return key ? flattenEntry(committee[key]) : [];
}

// The current board's doc has no `schoolyear` field yet, so derive one from
// the doc id (e.g. "2026" -> "2026-2027") rather than requiring a backfill.
function fallbackSchoolyear(id) {
  const startYear = Number(id);
  return Number.isFinite(startYear) ? `${startYear}-${startYear + 1}` : id;
}

// Lists every board on file so the page can offer a year picker, newest first.
export async function getBoardYears() {
  const snap = await getDocs(collection(db, BOARD_COLLECTION));
  return snap.docs
    .map((snapshot) => ({
      id: snapshot.id,
      schoolyear: snapshot.data().schoolyear || fallbackSchoolyear(snapshot.id),
    }))
    .sort((a, b) => parseInt(b.schoolyear, 10) - parseInt(a.schoolyear, 10));
}

// Fetches the leaders doc once and splits it into the four sections shown on
// the board page. Project Manager and Web Master live in Firestore under
// `leaders.board` alongside the rest of the exec board, and project/web
// officers live in a flat `leaders.officers` map, so both are pulled out by
// role keyword and merged in as each team's lead/officers.
export async function getLeaders(boardId = DEFAULT_BOARD_DOC_ID) {
  const snap = await getDoc(doc(db, BOARD_COLLECTION, boardId));
  const leaders = snap.exists() ? snap.data().leaders || {} : {};

  const boardMembers = flattenEntry(leaders.board);
  const officers = flattenEntry(leaders.officers);
  const committee = leaders.committee || {};

  const executive = boardMembers
    .filter((m) => !isProjectManager(m.role) && !isWebMaster(m.role))
    .sort(byExecRoleOrder);
  const projectManager = boardMembers.filter((m) => isProjectManager(m.role));
  const webMaster = boardMembers.filter((m) => isWebMaster(m.role));

  // Relabeled titles (Secretary -> Administration Director, etc.) only apply
  // to the current board — past boards keep the titles they actually had.
  const isCurrentBoard = boardId === DEFAULT_BOARD_DOC_ID;
  const applyDisplayRoles = isCurrentBoard ? withDisplayRoles : (members) => members;

  return {
    executive: applyDisplayRoles(executive),
    projectTeam: applyDisplayRoles([
      ...projectManager,
      ...officers.filter((m) => isProjectRole(m.role)),
      // Committee members don't carry individual titles in Firestore, so
      // they're always labeled "Project Officer" regardless of board year.
      ...committeeGroup(committee, "project").map((m) => ({ ...m, role: "Project Officer" })),
    ]),
    webTeam: applyDisplayRoles([
      ...webMaster,
      ...officers.filter((m) => isWebRole(m.role)),
      ...committeeGroup(committee, "web"),
    ]),
    coordinating: applyDisplayRoles(officers.filter((m) => isCoordinatingRole(m.role))),
    administrative: applyDisplayRoles(officers.filter((m) => isAdministrativeRole(m.role))),
    executiveOfficers: applyDisplayRoles(officers.filter((m) => isExecutiveOfficerRole(m.role))),
    finance: applyDisplayRoles(officers.filter((m) => isFinanceRole(m.role))),
    advisors: applyDisplayRoles(flattenEntry(leaders.advisors).sort(byAdvisorRoleOrder)),
  };
}
