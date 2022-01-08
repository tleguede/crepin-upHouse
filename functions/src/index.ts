// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

import * as functions from 'firebase-functions';

import { userCollection, auth, corsHandler } from './config';
import { updateUserIndex, registerUserIndex } from './userIndexes';

//#region users

export const createUser = functions.https.onRequest(async (req, resp) => {
  corsHandler(req, resp, async () => {
    try {

      const { uid, disabled, displayName, email, photoURL, phoneNumber } = await auth.createUser(req.body);

      const user = {
        ...req.body,
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

});

export const updateUserProfile = functions.https.onRequest(async (req, resp) => {
  corsHandler(req, resp, async () => {
    try {
      // resp.set('Access-Control-Allow-Origin', '*');

      const { id, password, ...rest } = req.body;

      await auth.updateUser(id, { ...rest, password });

      await userCollection.doc(id).set(rest, { merge: true });

      const result = await userCollection.doc(id).get();

      await updateUserIndex({
        ...rest,
        id
      });

      resp.status(200).json({ id: result.id, ...result.data() });
    } catch (error) {
      functions.logger.error({
        req: req.body,
        error
      }, { structuredData: true });
      resp.status(400).json(error);
    }
  });

});

// export const deleteUser = functions.https.onRequest(async (req, resp) => {
//   try {
//     const { id, state } = req.body;
//
//     await auth.updateUser(id, { disabled: state });
//
//     await userCollection.doc(id).set({ disabled: state, hidden: state }, { merge: true });
//
//     const result = await userCollection.doc(id).get();
//
//     resp.status(200).json({ id: result.id, ...result.data() });
//   } catch (error) {
//     functions.logger.error({
//       req: req.body,
//       error
//     }, { structuredData: true });
//     resp.status(400).json(error);
//   }
// });

//#endregion

//#region triggers
export const notify = functions.https.onRequest((req, resp) => {
  try {

    // const result = await userCollection.where('')

  } catch (error) {
    functions.logger.error(error, { structuredData: true });
    resp.status(400).json(error);
  }
});

export const updateIndexes = functions.auth.user().onCreate(async record => {
  try {

    const { uid, disabled, displayName, email, photoURL, phoneNumber } = record;

    const user = {
      id: uid,
      disabled: disabled || false,
      displayName: displayName || null,
      email: email || null,
      photoURL: photoURL || null,
      phoneNumber: phoneNumber || null,
      createdAt: new Date()
    };

    // @ts-ignore
    await registerUserIndex(user);

  } catch (error) {
    functions.logger.error({ record, error }, { structuredData: true });
  }
});

export const removeIndexes = functions.auth.user().onDelete((user, context) => {

});
//#endregion