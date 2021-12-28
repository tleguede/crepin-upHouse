import { firestore } from '../contexts/FirebaseContext';

export const userCollection = firestore.collection('users');
export const realEstateCollection = firestore.collection('realEstate');
export const callRequestCollection = firestore.collection('callRequest');

export const functionsBaseUrl = 'http://localhost:5001/up-house/us-central1/';

export const functionsPath = (name) => `${functionsBaseUrl}${name}`;