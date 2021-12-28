// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

import * as functions from 'firebase-functions';
import * as fb from 'firebase-admin' ;
import serviceAccount from './serviceAccountKey.json';

const admin = fb.initializeApp({
  // @ts-ignore
  credential: fb.credential.cert(serviceAccount)
});
const auth = admin.auth();
const firestore = admin.firestore();
const userCollection = firestore.collection('users');

export const createUser = functions.https.onRequest(async (req, resp) => {
  try {
    const { uid, disabled, displayName, email, photoURL, phoneNumber } = await auth.createUser(req.body);

    const user = {
      id: uid,
      disabled,
      displayName,
      email,
      photoURL,
      phoneNumber
    };

    await userCollection.doc(uid).set(user, { merge: true });

    resp.status(200).json(user);
  } catch (error) {
    functions.logger.info(error, { structuredData: true });
    resp.status(400).json(error);
  }
});

export const updateUserProfile = functions.https.onRequest(async (req, resp) => {
  try {
    const { id, password, ...rest } = req.body;

    functions.logger.info(req.method);

    await auth.updateUser(id, rest);

    await userCollection.doc(id).set(rest, { merge: true });

    resp.status(200).json(req.body);
  } catch (error) {
    functions.logger.info(error, { structuredData: true });
    resp.status(400).json(error);
  }
});


// export const updateUserPassword = functions.https.onRequest((req, resp) => {
//   try {
//
//   }catch (error) {
//     functions.logger.info(error, { structuredData: true });
//     resp.status(400).json(error);
//   }
// });

