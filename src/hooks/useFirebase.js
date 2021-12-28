import {useContext} from 'react';
import {FirebaseContext} from '../store/firebaseContext';

const useFirebase = () => {
  return useContext(FirebaseContext);
};

export default useFirebase;
