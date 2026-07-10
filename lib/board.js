import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

const BOARD_COLLECTION = "acm_board";
const BOARD_DOC_ID = "DMKcqkQWFId6BIaNV3Sf";

function toMember({ first, last, position, img } = {}) {
  return {
    role: position,
    name: [first, last].filter(Boolean).join(" "),
    img: img || null,
  };
}

// `board` is a map of single member objects, `officers`/`committee` are maps of
// sub-team arrays, and `advisors` is a plain array — normalize all three shapes.
function flattenGroup(group) {
  if (!group) return [];
  if (Array.isArray(group)) return group.map(toMember);
  return Object.values(group).flatMap((entry) =>
    Array.isArray(entry) ? entry.map(toMember) : [toMember(entry)]
  );
}

// Fetches the leaders doc once and splits it into board / officers / committee / advisors groups.
export async function getLeaders() {
  const snap = await getDoc(doc(db, BOARD_COLLECTION, BOARD_DOC_ID));
  const leaders = snap.exists() ? snap.data().leaders || {} : {};

  return {
    board: flattenGroup(leaders.board),
    officers: flattenGroup(leaders.officers),
    committee: flattenGroup(leaders.committee),
    advisors: flattenGroup(leaders.advisors),
  };
}
