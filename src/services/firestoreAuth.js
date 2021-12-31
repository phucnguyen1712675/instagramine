import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {auth} from '../firebase-config';
import {
  findLoginError,
  findRegisterError,
  findLogOutError,
} from '../utils/firestore';

export const logIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    const errorMessage = findLoginError(error.code);
    alert(errorMessage);
  }
};

export const register = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    const errorMessage = findRegisterError(error.code);
    alert(errorMessage);
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);

    return true;
  } catch (error) {
    const errorMessage = findLogOutError(error.code);
    alert(errorMessage);

    return false;
  }
};
