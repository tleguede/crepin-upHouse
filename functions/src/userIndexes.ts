import { userIndexCollection, firestore } from './config';
import { updateBy } from './utils';
import { User, UserIndexes } from './types';

export const updateUserIndex = async (user:User) => {
  const snap = await userIndexCollection
    .where('ids', 'array-contains', user?.id)
    .limit(1)
    .get();

  if (!snap.empty) {
    const doc = { id: snap.docs[0].id, ...snap.docs[0].data() } as UserIndexes;
    // @ts-ignore
    const records = updateBy(doc?.records || [], user);
    const ids = records?.map((one:User) => one?.id);
    const count = ids.length;

    await firestore.runTransaction(transaction => {
      const ref = userIndexCollection.doc(doc?.id);
      return transaction.get(ref).then(doc => {
        if (doc.exists) {
          transaction.set(ref, {
            records,
            ids,
            count,
            updatedAt: new Date()
          }, { merge: true });
        }
      });
    });

  } else {
    await registerUserIndex(user);
  }

};

export const registerUserIndex = async (user:User) => {
  const snap = await userIndexCollection
    .where('count', '<', 400)
    .limit(1)
    .get();

  if (snap.empty) {
    const records = [user];
    const ids = records?.map(one => one?.id);
    const count = ids.length;

    await userIndexCollection.add({
      records,
      ids,
      count,
      createdAt: new Date()
    });
  } else {
    const doc = { id: snap.docs[0].id, ...snap.docs[0].data() } as UserIndexes;
    const records = [...doc?.records, user];
    const ids = records?.map(one => one?.id);
    const count = ids.length;

    await firestore.runTransaction(transaction => {
      const ref = userIndexCollection.doc(doc?.id);
      return transaction.get(ref).then(doc => {
        if (doc.exists) {
          transaction.set(ref, {
            records,
            ids,
            count,
            updatedAt: new Date()
          }, { merge: true });
        }
      });
    });

  }
};