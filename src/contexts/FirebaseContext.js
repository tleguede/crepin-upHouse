import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/database';
import { firebaseConfig } from '../config';
import { useDispatch } from '../redux/store';
import { createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
// ----------------------------------------------------------------------

const ADMIN_EMAILS = ['demo@minimals.cc'];

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const storage = firebase.storage();
const firestore = firebase.firestore();
const realtimeDb = firebase.database();

if (window.location.hostname === 'localhost') {
  auth.useEmulator('http://localhost:9099/');
  storage.useEmulator('localhost', 9199);
  firestore.useEmulator('localhost', 8080);
  realtimeDb.useEmulator('localhost', 9000);
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

  const logUserProfile = ({ email, uid, displayName, photoURL,firstName,lastName }) => {
    firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .set({
        uid,
        email,
        photoURL: photoURL || null,
        displayName: displayName || `${firstName} ${lastName}`
      }).catch(error=>console.log(error))
  };

  const login = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithPopup(provider)
        .then(result=> {
          logUserProfile({ ...result.user });
          resolve(result)
        })
        .catch(reason => reject(reason))
    })  };

  const loginWithFaceBook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithPopup(provider)
        .then(result=> {
          logUserProfile({ ...result.user });
          resolve(result)
        })
        .catch(reason => reject(reason))
    })  };

  const loginWithTwitter = () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithPopup(provider)
        .then(result=> {
          logUserProfile({ ...result.user });
          resolve(result)
        })
        .catch(reason => reject(reason))
    })  };

  const loginWithPhone = () => {
    const provider = new firebase.auth.PhoneAuthProvider();
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithPopup(provider)
        .then(result=> {
          logUserProfile({ ...result.user });
          resolve(result)
        })
        .catch(reason => reject(reason))
    })
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
        })

      });

  const logout = async () => {
    await firebase.auth().signOut();
  };

  const resetPassword = async (email) => {
    await firebase.auth().sendPasswordResetEmail(email);
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
          role: ADMIN_EMAILS.includes(auth.email) ? 'admin' : 'user',
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
        resetPassword
      }}
    >
      <ReactReduxFirebaseProvider {...rrfProps}>
        {children}
      </ReactReduxFirebaseProvider>
    </AuthContext.Provider>
  );
}


export { AuthContext, AuthProvider, storage, firestore, auth, realtimeDb };
