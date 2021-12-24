import {useReducer, useEffect} from 'react';
import {onSnapshot, refEqual} from 'firebase/firestore';
import PropTypes from 'prop-types';
import useMemoCompare from './useMemoCompare';
import {useFirestoreQueryReducer} from '../reducers';
import {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR,
} from '../actions/useFirestoreQueryActions';

// Get doc data and merge doc.id
function getDocData(doc) {
  return doc.exists() ? {id: doc.id, ...doc.data()} : null;
}

// Get array of doc data from collection
function getCollectionData(collection) {
  return collection.docs.map(getDocData);
}

const useFirestoreQuery = ({query}) => {
  // Our initial state
  // Start with an "idle" status if query is falsy, as that means hook consumer is
  // waiting on required data before creating the query object.
  // Example: useFirestoreQuery(uid && firestore.collection("profiles").doc(uid))
  const initialState = {
    status: query ? 'loading' : 'idle',
    data: undefined,
    error: undefined,
  };

  // Setup our state and actions
  const [state, dispatch] = useReducer(useFirestoreQueryReducer, initialState);

  // Get cached Firestore query object with useMemoCompare (https://usehooks.com/useMemoCompare)
  // Needed because firestore.collection("profiles").doc(uid) will always being a new object reference
  // causing effect to run -> state change -> rerender -> effect runs -> etc ...
  // This is nicer than requiring hook consumer to always memoize query with useMemo.
  const queryCached = useMemoCompare({
    next: query,
    compare: (prevQuery) => {
      // Use built-in Firestore isEqual method to determine if "equal"
      return prevQuery && query && refEqual(query, prevQuery);
    },
  });

  useEffect(() => {
    // Return early if query is falsy and reset to "idle" status in case
    // we're coming from "success" or "error" status due to query change.
    if (!queryCached) {
      dispatch({type: IDLE});
      return;
    }

    dispatch({type: LOADING});

    // Subscribe to query with onSnapshot
    // Will unsubscribe on cleanup since this returns an unsubscribe function
    return onSnapshot(
      queryCached,
      (snapshot) => {
        // Get data for collection or doc
        const data = snapshot.docs
          ? getCollectionData(snapshot)
          : getDocData(snapshot);

        dispatch({type: SUCCESS, payload: data});
      },
      (error) => {
        dispatch({type: ERROR, payload: error});
      }
    );
  }, [queryCached]); // Only run effect if queryCached changes

  return state;
};

useFirestoreQuery.propTypes = {
  query: PropTypes.object.isRequired,
};

export default useFirestoreQuery;
