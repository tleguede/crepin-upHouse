import { callRequestCollection, realEstateCollection } from '../../constant/firestore';
import { isFunction } from 'lodash';
import { firestore } from '../../contexts/FirebaseContext';

export const requestCall = (data, callback = null) => {
  return async () => {
    try {

      await callRequestCollection.add({...data,createdAt:new Date()});

      await firestore.runTransaction(transaction => {
        const {realEstateId,userId}=data;
        const docRef = realEstateCollection.doc(realEstateId);
        return transaction.get(docRef).then(doc=>{
          if(doc.exists){

            const callRequests=(doc.data()?.callRequests||0)+1;
            const callRequestsIds=[userId].concat(doc.data()?.callRequestsIds||[])

            transaction.update(docRef,{callRequests,callRequestsIds})

          }
        })
      })

      isFunction(callback) && callback();

    } catch (e) {
      console.error(e);
    }
  };
};