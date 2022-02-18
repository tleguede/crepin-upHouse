import { updateBy } from 'src/utils/array';

import { zoneCollection } from 'src/constant/firestore';
import { firestore } from 'src/contexts/FirebaseContext';


export const addZone = (data, callback) => {
  return async () => {
    try {

      const snap = await zoneCollection
        .where('count', '<', 400)
        .limit(1)
        .get();

      if (snap.empty) {
        const records = [data];
        const ids = records?.map(one => one?.id);
        const count = ids.length;

        await zoneCollection.add({
          records,
          ids,
          count,
          createdAt: new Date()
        });
      } else {

        await firestore.runTransaction(transaction => {
          const ref = zoneCollection.doc(snap.docs[0]?.id);
          return transaction.get(ref).then(doc => {
            if (doc.exists) {

              const document = { id: doc.id, ...doc.data() };
              const records = [...document?.records, data];
              const ids = records?.map(one => one?.id);
              const count = ids.length;

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

      callback && callback();

    } catch (error) {
      console.error(error);
    }
  };
};

export const updateZone = (data, callback) => {
  return async (dispatch) => {
    try {
      const snap = await zoneCollection
        .where('ids', 'array-contains', data?.id)
        .limit(1)
        .get();

      if (!snap.empty) {


        await firestore.runTransaction(transaction => {
          const ref = zoneCollection.doc(snap.docs[0]?.id);
          return transaction.get(ref).then(doc => {
            if (doc.exists) {

              const document = { id: doc.id, ...doc.data() };
              const records = updateBy(document?.records || [], data);
              const ids = records?.map((one) => one?.id);
              const count = ids.length;

              transaction.set(ref, {
                records,
                ids,
                count,
                updatedAt: new Date()
              }, { merge: true });
            }
          });
        });

        callback && callback();

      } else {
        dispatch(addZone(data, callback));
      }

    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteZone = (id, callback) => {
  return async () => {
    try {
      const snap = await zoneCollection
        .where('ids', 'array-contains', id)
        .limit(1)
        .get();

      if (!snap.empty) {

        await firestore.runTransaction(transaction => {
          const ref = zoneCollection.doc(snap.docs[0]?.id);
          return transaction.get(ref).then(doc => {
            if (doc.exists) {

              const document = { id: doc.id, ...doc.data() };
              const records = (document?.records || [])?.filter(one => one?.id !== id);
              const ids = records?.map((one) => one?.id);
              const count = ids.length;

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

      callback && callback();

    } catch (error) {
      console.error(error);
    }
  };
};