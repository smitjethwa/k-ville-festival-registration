const admin = require("firebase-admin");
const fs = require("fs");

// Load service account
const serviceAccount = require("./credentials.json");

// Init Firestore
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Load backup.json
const backup = JSON.parse(fs.readFileSync("backup.json", "utf8"));

async function restore() {
  for (const [collectionName, docs] of Object.entries(backup)) {
    console.log(`Restoring collection: ${collectionName}`);
    for (const [docId, docData] of Object.entries(docs)) {
      await db.collection(collectionName).doc(docId).set(docData);
      console.log(`  Restored ${collectionName}/${docId}`);
    }
  }
  console.log("Restore complete ✅");
}

restore().catch((err) => {
  console.error("Restore failed ❌", err);
});
