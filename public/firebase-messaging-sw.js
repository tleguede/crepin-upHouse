// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.1/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config

const firebaseConfig = {
  apiKey: 'AIzaSyDhjvvHha2nEUGKbRThvT5xcxBJf_iuZis',
  projectId: 'up-house',
  messagingSenderId: '927329287805',
  appId: '1:927329287805:web:96d052fc4d54b4f528bb14',
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
if(firebase.messaging.isSupported()){
  const messaging = firebase.messaging();
  try {
    messaging.onBackgroundMessage(function(payload) {
      const { title, body } = payload.notification;
      const parseBody = JSON.parse(body);
      const desc = parseBody?.description;

      var html = desc;
      var div = document.createElement("div");
      div.innerHTML = html;
      var text = div.textContent || div.innerText || "";

      // eslint-disable-next-line no-restricted-globals
      return self.registration.showNotification(
        title,
        {
          body: text,
          icon: '/favicon/favicon.ico',
          silence:false,
          sound: '/static/alarm/alarm_message.mp3',
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          lang:'fr',
          tag: title
        }
      );
  
    });
  } catch (error) {
    console.error(error);
  }

}

