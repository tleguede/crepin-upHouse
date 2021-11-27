import { realEstateCollection } from '../../constant/firestore';
import { isFunction } from 'lodash';
import { auth, firestore } from '../../contexts/FirebaseContext';

export const createRealEstate = (data, callback = null) => {
  return async () => {
    try {

      await realEstateCollection.add(data);

      isFunction(callback) && callback();

    } catch (e) {
      console.error(e);
    }
  };
};

export const editRealEstate = (data, callback = null) => {
  return async () => {
    try {

      const { id, ...rest } = data;

      await realEstateCollection.doc(id).update(rest);

      isFunction(callback) && callback();

    } catch (e) {
      console.error(e);
    }
  };
};

export const changeBookMarkState = (data, callback = null) => {
  return async () => {
    try {

      const { id, state = false } = data;
      const currentUserId = auth.currentUser?.uid;

      await firestore.runTransaction(transaction => {
        const docRef = realEstateCollection.doc(id);
        return transaction.get(docRef).then(doc => {
          if (doc.exists) {
            const bookMarkedList = doc.data()?.bookmarkedByIds || [];
            const bookmarkedByIds = state
              ? [...bookMarkedList, currentUserId]
              : bookMarkedList.filter(one => one !== currentUserId);

            transaction.update(docRef, {
              bookmarkedByIds,
              bookmarked: bookmarkedByIds.length
            });
          }
        });
      });

      isFunction(callback) && callback();

    } catch (e) {
      console.error(e);
    }
  };
};

