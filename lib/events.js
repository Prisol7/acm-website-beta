import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

function toEvent(doc) {
  const { altText, imgUrl } = doc.data();
  return { id: doc.id, altText, imgUrl };
}

function pickRandom(items, count) {
  const pool = [...items];
  const picked = [];
  while (pool.length && picked.length < count) {
    const i = Math.floor(Math.random() * pool.length);
    picked.push(pool.splice(i, 1)[0]);
  }
  return picked;
}

// Only one document exists in this collection.
export async function getUpcomingEvent() {
  const snap = await getDocs(collection(db, "upcomingEvents"));
  return snap.empty ? null : toEvent(snap.docs[0]);
}

export async function getSemesterEvents() {
  const snap = await getDocs(collection(db, "semesterEvents"));
  return snap.docs.map(toEvent);
}

// Picks a random subset rather than showing the full archive.
export async function getPastEvents(count = 5) {
  const snap = await getDocs(collection(db, "pastEvents"));
  return pickRandom(snap.docs.map(toEvent), count);
}

// Full archive, for the dedicated past events page.
export async function getAllPastEvents() {
  const snap = await getDocs(collection(db, "pastEvents"));
  return snap.docs.map(toEvent);
}
