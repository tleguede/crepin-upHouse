import { firestore } from '../contexts/FirebaseContext';

export const userCollection = firestore.collection('users');
export const realEstateCollection = firestore.collection('realEstate');
export const callRequestCollection = firestore.collection('callRequest');
export const zoneCollection = firestore.collection('zones');

export const functionsBaseUrl = process.env.REACT_APP_FIREBASE_FUNCTIONS_BASE_URL;

export const functionsPath = (name) => `${functionsBaseUrl}${name}`;