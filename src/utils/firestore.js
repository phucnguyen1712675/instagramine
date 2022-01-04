import {AuthErrorCodes} from 'firebase/auth';

// Get doc data and merge doc.id
export function getDocData(doc) {
  return doc.exists() ? {id: doc.id, ...doc.data()} : null;
}

// Get array of doc data from collection
export function getCollectionData(docs) {
  return docs
    .filter((doc) => doc.exists())
    .map((doc) => ({id: doc.id, ...doc.data()}));
}

export const findLoginError = (code) => {
  switch (code) {
    case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
      return 'Too many attempts. Try again later.';
    case AuthErrorCodes.USER_DELETED:
    case AuthErrorCodes.INVALID_EMAIL:
    case AuthErrorCodes.INVALID_PASSWORD:
      return 'Invalid email or password';
    default:
      return 'Something went wrong';
  }
};

export const findRegisterError = (error) => {
  switch (error.code) {
    case AuthErrorCodes.EMAIL_EXISTS:
      return 'Email already in-use';
    default:
      return 'Something went wrong';
  }
};

export const findLogOutError = (error) => {
  switch (error.code) {
    case AuthErrorCodes.USER_SIGNED_OUT:
      return 'User has signed out';
    default:
      return 'Something went wrong';
  }
};
