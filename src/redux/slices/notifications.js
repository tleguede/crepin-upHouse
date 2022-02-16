import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { firestore } from 'src/contexts/FirebaseContext';
import {  reject } from 'lodash';
import { auth } from '../../contexts/FirebaseContext';
// import { NOTIFICATION_TYPES } from '../../constant';
// import { PATH_DASHBOARD } from '../../routes/paths';
import axios from 'axios';
import { functionsPath } from '../../constant/firestore';

// import { changeOnObject } from './../../utils/changeOnObject';


const slice = createSlice({
  name: 'notifications',
  initialState: {
    isLoading: false,
    error: false,
    tokens: [],
    notifications: []
  },
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      console.error(action.payload);
    },

    gotSuccess(state) {
      state.isLoading = false;
    },

    getNotificationsSuccess(state, action) {
      state.isLoading = false;
      state.notifications = action.payload;
    },

    deleteNotification(state, action) {
      state.notifications = reject(state.notifications, { id: action.payload });
    },

    setTokens(state, action) {
      state.tokens = action.payload;
    }

  }
});

// Reducer
export default slice.reducer;
// Actions
export const { startLoading, gotSuccess, hasError, getNotificationsSuccess } = slice.actions;

//#region async actions
export const setTokens = (users) => {
  return async (dispatch) => {
    const tokens = users.filter((u) => u?.token).map((us) => {
      return { id: us.id, token: us.token };
    });
    dispatch(slice.actions.setTokens(tokens));
  };
};

export const getAllNotification = (list, callback = null) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      dispatch(getNotificationsSuccess(list));
      callback && callback();
    } catch (error) {
      dispatch(hasError(error));
    }
  };
};

export const sendFirebaseNotification = async (getState, data, canAccessWithoutSender) => {
  const allTokens = getState().notifications.tokens;

  const tokensWithoutSender = allTokens.filter(one => one.id !== auth.currentUser.uid);


  const canReceivNotification = [...canAccessWithoutSender].map((id) => {
    return [...tokensWithoutSender].find(tk => tk.id === id);
  });


  const tokens = [];

  canReceivNotification.forEach((us) => {
    if (us?.token) {
      tokens.push(us.token);
    }
  });


  if (tokens.length) {
    const desc = {
      createdAt: data?.createdAt,
      type: data?.type,
      by: data?.by,
      description: data?.description,
      action: data?.returnId && {
        id: data?.returnId,
        sub: data?.action?.projectKey
      }
    };

    await axios.post(`${process.env.REACT_APP_FBNOTIF}/many`, {
      tokens,
      title: data.title,
      description: JSON.stringify(desc)
    });
  }
};

/**
 *
 * @param data {{createdAt: Date, isUnRead: string[], canAccessEmail: string[], canAccess: string[], description: string, action: {url: string}, by: {id: string,displayName: string,photoURL: string,}, avatar: string, title: string, type: string}}
 * @param callback {function()}
 * @returns {(function(*): Promise<void>)|*}
 */
export const createNotification = ({ data, callback }) => {
  return async (dispatch, getState) => {
    dispatch(startLoading());

    try {
      // const { canAccess } = data;


      const notification = {
        ...{ ...data },
        ...(auth?.currentUser && {
          by: {
            id: auth?.currentUser?.uid,
            displayName: auth?.currentUser?.displayName || '',
            photoURL: auth?.currentUser?.photoURL || '',
            email: auth?.currentUser?.email || ''
          }
        }),

        // ...(isEmpty(data?.canAccess) && { isBroadcast: true }),
        createdAt: new Date()
      };

     const {id}=  await firestore.collection('notifications').add(notification);

      await axios.post(functionsPath('notify'), {
        notification,
        id
      });

      dispatch(gotSuccess());

      callback && callback();
      // sendFirebaseNotification(getState, data, canAccessWithoutSender);

    } catch (error) {
      dispatch(hasError(error));
    }
  };
};

export const setNotificationsAsRead = createAsyncThunk(
  'notification/mark_as_read',
  async ({ notificationIds }, { dispatch, getState }) => {
    try {
      const { notifications: { notifications: list } } = getState();

      for (const one of notificationIds) {
        const { isUnRead, id } = list.find(notif => notif.id === one);

        let result = {
          [auth.currentUser.uid]: false
        };

        if (isUnRead) result = { ...isUnRead, ...result };

        await firestore.collection('notifications').doc(id).set({
          isUnRead: result
        }, { merge: true });

      }
    } catch (error) {
      dispatch(hasError(error));
    }

  }
);


