const admin = require("firebase-admin");
const serviceAccount = require("./credentials.json"); // your file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function deleteAllUsers(nextPageToken) {
  const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);

  const uids = listUsersResult.users.map((user) => user.uid);

  if (uids.length > 0) {
    const deleteResult = await admin.auth().deleteUsers(uids);
    console.log(`Deleted ${deleteResult.successCount} users`);
    if (deleteResult.failureCount > 0) {
      console.error("Failed to delete some users:", deleteResult.errors);
    }
  }

  if (listUsersResult.pageToken) {
    await deleteAllUsers(listUsersResult.pageToken);
  }
}

deleteAllUsers()
  .then(() => console.log("Finished deleting all users"))
  .catch((error) => console.error("Error deleting users:", error));
