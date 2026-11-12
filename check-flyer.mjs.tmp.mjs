import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { readFileSync } from "fs";

for (const line of readFileSync("/Users/ponce/Development/acm-website-beta/.env.local", "utf8").split("\n")) {
  const m = line.match(/^([^=]+)="?([^"]*)"?$/);
  if (m) process.env[m[1]] = m[2];
}
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const snap = await getDoc(doc(db, "semesterEvents", "Mentorship "));
console.log(snap.exists() ? snap.data() : "MISSING");
