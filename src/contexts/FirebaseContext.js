import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/messaging';
import { firebaseConfig } from '../config';
import { useDispatch } from '../redux/store';
import { createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import axios from 'axios';
import { functionsPath } from '../constant/firestore';
// ----------------------------------------------------------------------

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const storage = firebase.storage();
const firestore = firebase.firestore();
const realtimeDb = firebase.database();
const messaging = firebase.messaging();

if (window.location.hostname === 'localhost' && false) {
  auth.useEmulator('http://localhost:9099/');
  storage.useEmulator('localhost', 9199);
  firestore.useEmulator('localhost', 8080);
  realtimeDb.useEmulator('localhost', 9000);
} else {

  if (firebase?.messaging?.isSupported()) {
    firebase.messaging();
  }

  firebase.firestore().settings({
    cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
  });

  firebase.firestore().enablePersistence().catch((err) => {
    console.log(err);
  });

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => {
    // if (!auth.currentUser) {
    //   auth.signInAnonymously().catch((error)=> {
    //     // Handle Errors here.
    //     let errorCode = error.code;
    //     let errorMessage = error.message;
    //
    //     if (errorCode === 'auth/operation-not-allowed') {
    //       alert('You must enable Anonymous auth in the Firebase Console.');
    //     } else {
    //       console.error(error);
    //     }
    //   })
    // }

  }).catch((err) => {
    console.log(err);
  });

}

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const reducer = (state, action) => {
  if (action.type === 'INITIALISE') {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  }

  return state;
};

const AuthContext = createContext({
  ...initialState,
  method: 'firebase',
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  loginWithGoogle: () => Promise.resolve(),
  loginWithFaceBook: () => Promise.resolve(),
  loginWithTwitter: () => Promise.resolve(),
  logout: () => Promise.resolve()
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const storeDispatch = useDispatch();

  const rrfProps = {
    firebase,
    config: {
      userProfile: 'users',
      useFirestoreForProfile: true
    },
    dispatch: storeDispatch,
    createFirestoreInstance
  };

  useEffect(
    () =>
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const docRef = firebase.firestore().collection('users').doc(user.uid);
          docRef
            .get()
            .then((doc) => {
              if (doc.exists) {
                setProfile(doc.data());
              }
            })
            .catch((error) => {
              console.error(error);
            });

          dispatch({
            type: 'INITIALISE',
            payload: { isAuthenticated: true, user }
          });
        } else {
          dispatch({
            type: 'INITIALISE',
            payload: { isAuthenticated: false, user: null }
          });
        }
      }),
    [dispatch]
  );

  const logUserProfile = ({ email, uid, displayName, photoURL, firstName, lastName }) => {
    firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .set({
        uid,
        email,
        photoURL: photoURL || null,
        displayName: displayName || `${firstName} ${lastName}`
      }, { merge: true }).catch(error => console.log(error));
  };

  const login = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithPopup(provider)
        .then(result => {
          logUserProfile({ ...result.user });
          resolve(result);
        })
        .catch(reason => reject(reason));
    });
  };

  const loginWithFaceBook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithPopup(provider)
        .then(result => {
          logUserProfile({ ...result.user });
          resolve(result);
        })
        .catch(reason => reject(reason));
    });
  };

  const loginWithTwitter = () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithPopup(provider)
        .then(result => {
          logUserProfile({ ...result.user });
          resolve(result);
        })
        .catch(reason => reject(reason));
    });
  };

  const loginWithPhone = () => {
    const provider = new firebase.auth.PhoneAuthProvider();
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithPopup(provider)
        .then(result => {
          logUserProfile({ ...result.user });
          resolve(result);
        })
        .catch(reason => reject(reason));
    });
  };

  const register = (email, password, firstName, lastName) =>
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {

        logUserProfile({
          ...res.user,
          firstName,
          lastName
        });

      });

  const logout = async () => {
    await firebase.auth().signOut();
  };

  const resetPassword = async (email) => {
    await firebase.auth().sendPasswordResetEmail(email);
  };

  const updateProfile = async (data) => {
    await axios.post(functionsPath('updateUserProfile'), { ...data, id: auth.uid });
  };

  const updatePassword = async (oldPass, newPass) => {

    return new Promise(async (res, rej) => {
      try {
        const cred = firebase.auth.EmailAuthProvider.credential(auth.email, oldPass);
        await firebase.auth().currentUser.reauthenticateWithCredential(cred);
        res(await firebase.auth().currentUser.updatePassword(newPass));
      } catch (error) {
        rej(error);
      }
    });

  };

  const auth = { ...state.user };


  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'firebase',
        user: {
          id: auth.uid,
          email: auth.email,
          photoURL: auth.photoURL || profile?.photoURL,
          displayName: auth.displayName || profile?.displayName,
          role: profile?.isAdmin ? 'admin' : 'user',
          isAdmin: profile?.isAdmin || false,
          phoneNumber: auth.phoneNumber || profile?.phoneNumber || '',
          country: profile?.country || '',
          address: profile?.address || '',
          state: profile?.state || '',
          city: profile?.city || '',
          zipCode: profile?.zipCode || '',
          about: profile?.about || '',
          isPublic: profile?.isPublic || false
        },
        login,
        register,
        loginWithGoogle,
        loginWithFaceBook,
        loginWithTwitter,
        loginWithPhone,
        logout,
        resetPassword,
        updateProfile,
        updatePassword
      }}
    >
      <ReactReduxFirebaseProvider {...rrfProps}>
        {children}
      </ReactReduxFirebaseProvider>
    </AuthContext.Provider>
  );
}


export { AuthContext, AuthProvider, storage, firestore, auth, realtimeDb, messaging, firebase };
