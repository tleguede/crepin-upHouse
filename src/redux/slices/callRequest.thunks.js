import { isFunction, isString } from 'lodash';
import { firestore } from '../../contexts/FirebaseContext';
import { callRequestCollection, realEstateCollection } from '../../constant/firestore';
import { createNotification } from './notifications';
import { NOTIFICATION_TYPES } from '../../constant';

export const requestCall = (data, callback = null) => {
  return async (dispatch) => {
    try {

      await callRequestCollection.add({ ...data, createdAt: new Date() });

      await firestore.runTransaction(transaction => {
        const { realEstateId, userId } = data;
        const docRef = realEstateCollection.doc(realEstateId);
        return transaction.get(docRef).then(doc => {
          if (doc.exists) {

            const callRequests = (doc.data()?.callRequests || 0) + 1;
            const callRequestsIds = [userId].concat(doc.data()?.callRequestsIds || []).filter(id => isString(id));

            transaction.update(docRef, { callRequests, callRequestsIds });

          }
        });
      });

      dispatch(createNotification({
        data: {
          title: 'Nouvelle demande d\'appel',
          description: data?.realEstateName,
          type: NOTIFICATION_TYPES.CALL_REQUEST
        }
      }));

      isFunction(callback) && callback();

    } catch (e) {
      console.error(e);
    }
  };
};

export const editCallRequest = (data, callback = null) => {
  return async () => {
    try {

      const { id, ...rest } = data;

      await callRequestCollection.doc(id).update({ ...rest, updatedAt: new Date() });

      isFunction(callback) && callback();

    } catch (e) {
      console.error(e);
    }
  };
};