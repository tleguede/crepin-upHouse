import * as fb from 'firebase-admin' ;
import serviceAccount from './serviceAccountKey.json';
import cors from 'cors';

export const corsHandler = cors({ origin: true })

const admin = fb.initializeApp({
  // @ts-ignore
  credential: fb.credential.cert(serviceAccount)
});

export const auth = admin.auth();
export const firestore = admin.firestore();
export const messaging = admin.messaging();

export const userCollection = firestore.collection('users');
export const notificationCollection = firestore.collection('notifications');
export const referenceCollection = firestore.collection('references');
export const userIndexCollection = firestore.collection('user_indexes');