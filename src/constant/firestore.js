import { firestore } from '../contexts/FirebaseContext';

export const realEstateCollection=firestore.collection('realEstate');

export const callRequestCollection=firestore.collection('callRequest');