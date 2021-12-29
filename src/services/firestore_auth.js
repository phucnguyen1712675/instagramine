import {signOut} from 'firebase/auth';
import {auth} from '../firebase-config';
import {findLogOutError} from '../utils/firestore';

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    const errorMessage = findLogOutError(error.code);
    alert(errorMessage);
  }
};
