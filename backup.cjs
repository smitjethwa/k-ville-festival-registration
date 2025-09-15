const admin = require("firebase-admin");
const fs = require("fs");

admin.initializeApp({
  credential: admin.credential.cert(require("./credentials.json")),
});

const db = admin.firestore();

async function backup() {
  const data = {};
  const collections = await db.listCollections();

  for (const col of collections) {
    const snapshot = await col.get();
    data[col.id] = {};
    snapshot.forEach(doc => {
      data[col.id][doc.id] = doc.data();
    });
  }

  fs.writeFileSync("backup.json", JSON.stringify(data, null, 2));
  console.log("Backup complete ✅ Saved to backup.json");
}

backup();
