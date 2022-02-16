import { useEffect, createContext } from 'react';

import useAuth from 'src/hooks/useAuth';
import { firebase, messaging } from 'src/contexts/FirebaseContext';
import { userCollection } from '../constant/firestore';

export const NotificationContext = createContext(null);

export default function NotificationProvider({ children }) {
  const { isAuthenticated, user: { id } } = useAuth();


  useEffect(() => {

    if (isAuthenticated) {

      messaging.getToken().then(token => {
        userCollection.doc(id).update({ token }).catch(error => console.log(error));
      }).catch(error=>console.log(error))

    }

  }, [isAuthenticated, id]);


  useEffect(() => {

    if (firebase?.messaging?.isSupported()) {

      Notification.requestPermission().then(result => {
        if (result === 'granted') {
          messaging.onMessage(payload => {
            const { title, body } = payload.notification;
            const bodyParse = JSON.parse(body);
            new Notification(title, { body: bodyParse?.description });
          });
        }
      });

    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NotificationContext.Provider value={{}}>
      {children}
    </NotificationContext.Provider>
  );
}