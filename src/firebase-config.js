import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAQsvQeXkU6ilUIhMbnTHO5kBYH5HDxIOM',
  authDomain: 'instagramine-db081.firebaseapp.com',
  projectId: 'instagramine-db081',
  storageBucket: 'instagramine-db081.appspot.com',
  messagingSenderId: '791267528738',
  appId: '1:791267528738:web:96006d52e5fc0f1b11fa7b',
  measurementId: 'G-B6208EGEHK',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
