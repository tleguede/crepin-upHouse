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
// const messaging = admin.messaging();

const userCollection = firestore.collection('users');
// const referenceCollection = firestore.collection('references');
// const userIndexCollection = firestore.collection('user_indexes');

//#region users

export const createUser = functions.https.onRequest(async (req, resp) => {
  try {

    const { uid, disabled, displayName, email, photoURL, phoneNumber } = await auth.createUser(req.body);

    const user = {
      disabled: disabled || false,
      displayName: displayName || null,
      email: email || null,
      photoURL: photoURL || null,
      phoneNumber: phoneNumber || null,
      createdAt: new Date()
    };

    await userCollection.doc(uid).set(user, { merge: true });

    resp.status(200).json({ ...user, id: uid });
  } catch (error) {
    functions.logger.error({
      req: req.body,
      error
    }, { structuredData: true });
    resp.status(400).json(error);
  }
});

export const updateUserProfile = functions.https.onRequest(async (req, resp) => {
  try {
    // resp.set('Access-Control-Allow-Origin', '*');

    const { id, password, ...rest } = req.body;

    await auth.updateUser(id, rest);

    await userCollection.doc(id).set(rest, { merge: true });

    const result = await userCollection.doc(id).get();

    resp.status(200).json({ id: result.id, ...result.data() });
  } catch (error) {
    functions.logger.error({
      req: req.body,
      error
    }, { structuredData: true });
    resp.status(400).json(error);
  }
});

export const deleteUser = functions.https.onRequest(async (req, resp) => {
  try {
    const { id, state } = req.body;

    await auth.updateUser(id, { disabled: state });

    await userCollection.doc(id).set({ disabled: state, hidden: state }, { merge: true });

    const result = await userCollection.doc(id).get();

    resp.status(200).json({ id: result.id, ...result.data() });
  } catch (error) {
    functions.logger.error({
      req: req.body,
      error
    }, { structuredData: true });
    resp.status(400).json(error);
  }
});

//#endregion


export const notify = functions.https.onRequest((req, resp) => {
  try {

    // const result = await userCollection.where('')

  } catch (error) {
    functions.logger.error(error, { structuredData: true });
    resp.status(400).json(error);
  }
});

export const updateIndexes = functions.auth.user().onCreate(user => {
  try {

    // const result = await userCollection.where('')

  } catch (error) {
    functions.logger.error(error, { structuredData: true });
  }
})
