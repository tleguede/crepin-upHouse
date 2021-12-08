const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./up-house-firebase-adminsdk-cfkx2-ed44a35b96.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://up-house-default-rtdb.firebaseio.com"
});

const auth=admin.auth();
const firestore=admin.firestore();


// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript


const logUserProfile = ({ email='', uid='', displayName='', photoURL=null,firstName='',lastName='' }) => {
 return firestore
    .collection('users')
    .doc(uid)
    .set({
      uid,
      email,
      photoURL: photoURL || null,
      displayName: displayName || `${firstName} ${lastName}`
    }).catch((error)=>console.log(error))
};

// module.exports
exports.createUser = functions.https.onRequest(async (request, response) => {
  try {
    const data = request.body;

    const users = await auth.createUser({ ...data })
    await logUserProfile({...data,...users})

    functions.logger.info("Hello logs!", { structuredData: true });

    response.status(200).json({ message:''})

  } catch (error) {
    response.status(401).json({ message: error?.message, code: error?.code })
    functions.logger.info("Hello logs!", { structuredData: true });
  }

});

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
