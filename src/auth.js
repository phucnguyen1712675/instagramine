const fakeAuthProvider = {
  isAuthenticated: false,
  signIn(callback) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 1000); // fake async
  },
  signOut(callback) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 1000);
  },
};

export {fakeAuthProvider};
