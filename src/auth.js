const fakeAuthProvider = {
  isAuthenticated: false,
  signIn: (callback) => {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
  },
  signUp: (callback) => {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
  },
  signOut: (callback) => {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

export {fakeAuthProvider};
