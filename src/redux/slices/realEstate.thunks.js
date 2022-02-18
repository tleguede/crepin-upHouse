import { realEstateCollection } from '../../constant/firestore';
import { isFunction, keys } from 'lodash';
import { auth, firestore } from '../../contexts/FirebaseContext';
import { gotList, gotSelectedRealEstate, hasError, startLoading } from './realEstate.slice';
import { selectRealEstate } from '../selectors';
import { isEqual } from 'lodash';
import { NOTIFICATION_TYPES, REAL_ESTATE_STATE } from '../../constant';
import { isNotEmpty } from '../../utils/type_check';
import { createNotification } from './notifications';

export const createRealEstate = (data, callback = null) => {
  return async (dispatch) => {
    try {

      const result = await realEstateCollection.add(data);

      dispatch(createNotification({
        data: {
          title: 'Nouvelle demande de validation',
          description: data?.name,
          type: NOTIFICATION_TYPES.ESTATE_STATE_CHANGE,
          action: {
            id: result?.id
          }
        }
      }));

      isFunction(callback) && callback();

    } catch (e) {
      console.error(e);
    }
  };
};

export const editRealEstate = (data, callback = null) => {
  return async (dispatch) => {
    try {

      const { id, ...rest } = data;

      await realEstateCollection.doc(id).update(rest);

      if (keys(rest).length === 1 && 'state' in data) {
        const doc = await realEstateCollection.doc(id).get();
        const { state } = data;
        let title = '';

        if (state === REAL_ESTATE_STATE.VALIDATED) {
          title = 'Votre publication a été approuvé';
        } else if (state === REAL_ESTATE_STATE.REJECTED) {
          title = 'Votre publication a été rejeté';
        }

        dispatch(createNotification({
          data: {
            title,
            description: doc.data()?.name,
            type: NOTIFICATION_TYPES.ESTATE_STATE_CHANGE,
            action: {
              id: doc?.id
            },
            canAccess:[doc?.data()?.owner?.id],
          }
        }));

      }


      isFunction(callback) && callback();

    } catch (e) {
      console.error(e);
    }
  };
};

export const deleteRealEstate = (id, callback = null) => {
  return async () => {
    try {

      await realEstateCollection.doc(id).delete();

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

export const getRealEstate = (id, callback = null) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());

      const result = await realEstateCollection.doc(id).get();

      if (result.exists) {
        const data = {
          id: result.id,
          ...result.data()
        };
        dispatch(gotSelectedRealEstate(data));
      } else {
        dispatch(hasError('notFound'));
      }

      isFunction(callback) && callback();

    } catch (e) {
      dispatch(hasError(e));
    }
  };
};


export const searchRealEstate = (filter, limit = 20, callback) => {
  return async (dispatch, getState) => {
    try {
      // console.log(filter);
      dispatch(startLoading());
      const { filter: prevFilter, cursor: prevCursor } = selectRealEstate(getState());
      const loadMore = isEqual(filter, prevFilter);

      let query = realEstateCollection
        .orderBy('cost', 'desc')
        .orderBy('createdAt', 'desc')
        .orderBy('area', 'desc')
        .where('state', '==', REAL_ESTATE_STATE.VALIDATED)
        .limit(limit);

      //#region query builder
      if (isNotEmpty(filter?.zone)) {
        query = query.where('zone', '==', filter?.zone);
      }

      if (isNotEmpty(filter?.category)) {
        query = query.where('category', '==', filter?.category);
      }

      if (filter?.type?.length > 0) {
        query = query.where('searchHelper', 'array-contains-any', filter?.type);
      }

      if (isNotEmpty(filter?.transactionType)) {
        query = query.where('transactionType', '==', filter?.transactionType);
      }

      // if (filter?.costRange?.min !== 0) {
      //   query = query.where('cost', '>=', filter?.costRange?.min);
      // }
      //
      // if (filter?.costRange?.max !== 0) {
      //   query = query.where('cost', '<=', filter?.costRange?.max);
      // }
      //
      // if (filter?.areaRange?.min !== 0) {
      //   query = query.where('area', '>=', filter?.areaRange?.min);
      // }
      //
      // if (filter?.areaRange?.max !== 0) {
      //   query = query.where('area', '<=', filter?.areaRange?.max);
      // }
      //
      // if (filter?.areaUnit) {
      //   query = query.where('areaUnit', '==', filter?.areaUnit);
      // }
      //
      if (isNotEmpty(filter?.numberOfRoom)) {
        query = query.where('numberOfRoom', '==', filter?.numberOfRoom);
      }

      if (isNotEmpty(filter?.numberOfBathRoom)) {
        query = query.where('numberOfBathRoom', '==', filter?.numberOfBathRoom);
      }

      if (isNotEmpty(filter?.numberOfHangar)) {
        query = query.where('numberOfHangar', '==', filter?.numberOfHangar);
      }

      if (isNotEmpty(filter?.numberOfParking)) {
        query = query.where('numberOfParking', '==', filter?.numberOfParking);
      }

      if (isNotEmpty(filter?.otherFeature)) {
        query = query.where('otherFeature', 'array-contains-any', filter?.otherFeature);
      }

      if (isNotEmpty(filter?.building)) {
        query = query.where('building', 'array-contains-any', filter?.building);
      }

      if (isNotEmpty(filter?.plexType)) {
        query = query.where('plexType', '==', filter?.plexType);
      }

      if (isNotEmpty(filter?.otherCriterion)) {
        query = query.where('otherCriterion', 'array-contains-any', filter?.otherCriterion);
      }

      if (isNotEmpty(filter?.featureType)) {
        query = query.where('featureType', '==', filter?.featureType);
      }

      if (isNotEmpty(filter?.buildingOtherCriterion)) {
        query = query.where('buildingOtherCriterion', 'array-contains-any', filter?.buildingOtherCriterion);
      }
      //#endregion

      const ref = loadMore ? query.startAfter(prevCursor) : query;

      const snap = await ref.get();


      const data = {
        filter,
        cursor: snap.docs[snap.docs.length - 1],
        hasMore: limit === snap.docs.length,
        list: snap.docs.map(one => ({ id: one.id, ...one.data() }))
      };

      dispatch(gotList(data));

      isFunction(callback) && callback();

    } catch (e) {
      dispatch(hasError(e));
    }
  };
};

