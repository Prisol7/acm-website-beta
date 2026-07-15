import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { db, storage } from "./firebase";

const WEBSITE_IMAGES_FOLDER = "website_images";

// Each source can fail independently (e.g. Storage rules not yet open for
// `website_images`) without taking the whole carousel down with it.
async function getWebsiteImages() {
  try {
    const folderRef = ref(storage, WEBSITE_IMAGES_FOLDER);
    const { items } = await listAll(folderRef);
    return await Promise.all(items.map((item) => getDownloadURL(item)));
  } catch (err) {
    console.error("getWebsiteImages failed:", err);
    return [];
  }
}

async function getFlyerImages() {
  try {
    const [semesterSnap, pastSnap] = await Promise.all([
      getDocs(collection(db, "semesterEvents")),
      getDocs(collection(db, "pastEvents")),
    ]);
    return [...semesterSnap.docs, ...pastSnap.docs]
      .map((doc) => doc.data().imgUrl)
      .filter(Boolean);
  } catch (err) {
    console.error("getFlyerImages failed:", err);
    return [];
  }
}

function shuffle(items) {
  const pool = [...items];
  const shuffled = [];
  while (pool.length) {
    const i = Math.floor(Math.random() * pool.length);
    shuffled.push(pool.splice(i, 1)[0]);
  }
  return shuffled;
}

// Alternates between the two sources so the carousel mixes general photos
// with event flyers instead of clumping one source together.
function intermix(a, b) {
  const mixed = [];
  const max = Math.max(a.length, b.length);
  for (let i = 0; i < max; i++) {
    if (a[i]) mixed.push(a[i]);
    if (b[i]) mixed.push(b[i]);
  }
  return mixed;
}

// Site photos from Firebase Storage (`website_images`) intermixed with event
// flyers from Firestore, for the homepage carousel.
export async function getCarouselImages() {
  const [websiteImages, flyerImages] = await Promise.all([
    getWebsiteImages(),
    getFlyerImages(),
  ]);
  return intermix(shuffle(websiteImages), shuffle(flyerImages));
}
