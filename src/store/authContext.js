import {createContext, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {onAuthStateChanged} from 'firebase/auth';
import {doc, getDoc} from 'firebase/firestore';
import {useMounted, useLocalStorage} from '../hooks';
import {auth, db} from '../firebase-config';

const AuthContext = createContext({
  currentUser: null,
  uid: null,
  setCurrentUserUid: () => {},
});

const AuthContextProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);

  const [uid, setUid] = useLocalStorage({
    key: 'uid',
    initialValue: null,
  });

  const mounted = useMounted();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          // User is signed in
          const uid = user.uid;
          const userSnap = await getDoc(doc(db, `users/${uid}`));

          if (userSnap.exists()) {
            const userData = userSnap.data();

            if (mounted.current) {
              setCurrentUser(userData);
            }
          }
        } else {
          // User is signed out
          setCurrentUser(null);
        }
      } catch (error) {
        alert(error);
      }
    });

    return () => unsubscribe();
  }, [mounted]);

  const setCurrentUserUid = (id) => setUid(id);

  const value = {
    currentUser,
    uid,
    setCurrentUserUid,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {AuthContext, AuthContextProvider};
