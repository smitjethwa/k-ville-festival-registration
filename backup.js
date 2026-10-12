import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';

// Read credentials from the local file
const serviceAccount = JSON.parse(fs.readFileSync(new URL('./credentials.json', import.meta.url)));

// Initialize Firebase Admin
initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function backupSubmissions() {
  try {
    console.log('Fetching submissions from Firestore...');
    const snapshot = await db.collection('submissions').get();
    
    const submissions = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      // Firestore timestamps need to be converted so JSON.stringify doesn't break or output weird objects
      if (data.created_at && data.created_at.toDate) {
        data.created_at = data.created_at.toDate().toISOString();
      }
      if (data.updated_at && data.updated_at.toDate) {
        data.updated_at = data.updated_at.toDate().toISOString();
      }

      submissions.push({
        id: doc.id,
        ...data
      });
    });

    fs.writeFileSync('backup.json', JSON.stringify(submissions, null, 2));
    console.log(`Backup completed successfully! Saved ${submissions.length} records to backup.json`);
    process.exit(0);
  } catch (error) {
    console.error('Error backing up submissions:', error);
    process.exit(1);
  }
}

backupSubmissions();
