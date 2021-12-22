/**
 * This represents some generic auth provider API, like Firebase.
 */
const fakeAuthProvider = {
  signIn: (callback) => {
    setTimeout(callback, 100); // fake async
  },
  signUp: (callback) => {
    setTimeout(callback, 100); // fake async
  },
  signOut: (callback) => {
    setTimeout(callback, 100);
  },
};

export {fakeAuthProvider};
