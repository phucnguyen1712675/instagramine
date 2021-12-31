import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  getDoc,
  updateDoc,
  limit,
  writeBatch,
  serverTimestamp,
} from 'firebase/firestore';
import {db} from '../firebase-config';
import {MAX_STORIES_NUMBER} from '../constants';
import {
  searchHistoryItemConverter,
  requestSenderConverter,
} from '../converters';
import {getCollectionData, getDocData} from '../utils/firestore';
import {removeUndefinedFields} from '../utils/object';

// Collection paths
export const usersColRef = collection(db, 'users');
export const postsColRef = collection(db, 'posts');
export const storyCategories = collection(db, 'story_categories');
export const junctionUserRequestSenderColRef = collection(
  db,
  'junction_user_request_sender'
);
export const junctionUserSearchHistoryColRef = collection(
  db,
  'junction_user_search_history'
);
export const junctionUserFollowingUserColRef = collection(
  db,
  'junction_user_following_user'
);
export const junctionUserSavedPostColRef = collection(
  db,
  'junction_user_saved_post'
);
export const junctionUserStoryCategoryColRef = collection(
  db,
  'junction_user_story_category'
);

// Document paths
export const userDocRef = (uid) => doc(db, `users/${uid}`);
export const postDocRef = (id) => doc(db, `posts/${id}`);
export const storyCategoryDocRef = (storyCategoryId) =>
  doc(db, `story_categories/${storyCategoryId}`);
export const junctionUserSearchHistoryDocRef = ({uid, searchUserId}) =>
  doc(db, `junction_user_search_history/${uid}_${searchUserId}`);
export const junctionUserSavedPostDocRef = ({uid, savedPostId}) =>
  doc(db, `junction_user_saved_post/${uid}_${savedPostId}`);
export const junctionUserRequestSenderDocRef = ({uid, requestSenderId}) =>
  doc(db, `junction_user_request_sender/${uid}_${requestSenderId}`);
export const junctionUserFollowingUserDocRef = ({uid, followingUserId}) =>
  doc(db, `junction_user_following_user/${uid}_${followingUserId}`);

// Query paths
export const junctionUserRequestSenderQuery = (uid) =>
  query(junctionUserRequestSenderColRef, where('uid', '==', uid));
export const junctionUserSearchHistoryQuery = (uid) =>
  query(
    junctionUserSearchHistoryColRef,
    where('uid', '==', uid),
    orderBy('createdAt', 'desc')
  );
export const junctionUserFollowingUserQuery = (uid) =>
  query(junctionUserFollowingUserColRef, where('uid', '==', uid));
export const junctionUserSavedPostQuery = (uid) =>
  query(
    junctionUserSavedPostColRef,
    where('uid', '==', uid),
    orderBy('createdAt', 'desc')
  );
export const junctionUserStoryCategoryQuery = (uid) =>
  query(
    junctionUserStoryCategoryColRef,
    where('uid', '==', uid),
    orderBy('views', 'desc'),
    limit(MAX_STORIES_NUMBER)
  );

// Helper Functions
const getJunctionDocs = async (query, callbackFn) => {
  try {
    const junctions = await getDocs(query);
    const docs = await Promise.all(
      junctions.docs.filter((doc) => doc.exists()).map(callbackFn)
    );
    return docs;
  } catch (error) {
    console.log(error);
  }
};

const getAllDocsByQuery = async (query) => {
  try {
    const snapshot = await getDocs(query);
    return getCollectionData(snapshot.docs);
  } catch (error) {
    console.log(error);
  }
};

const addNewJunctionDoc = async (docRef, data) => {
  try {
    delete data.id;
    removeUndefinedFields(data);
    await setDoc(docRef, data);
  } catch (error) {
    console.log(error);
  }
};

// Custom Functions
// export const getAllJunctionUserRequestSenderByUid = async (uid) => {
//   const q = junctionUserRequestSenderQuery(uid);

//   return getAllDocsByQuery(q);
// };

export const getSavedPostsByUid = async (uid) => {
  const q = junctionUserSavedPostQuery(uid);

  return getJunctionDocs(q, async (doc) => {
    const {postId} = doc.data();
    const docRef = postDocRef(postId);
    const snapshot = await getDoc(docRef);
    return getDocData(snapshot);
  });
};

export const getRequestSendersByUid = async (uid) => {
  const q = junctionUserRequestSenderQuery(uid);

  return getJunctionDocs(q, async (doc) => {
    const {requestSenderId} = doc.data();
    const docRef = userDocRef(requestSenderId).withConverter(
      requestSenderConverter
    );
    const snapshot = await getDoc(docRef);
    return getDocData(snapshot);
  });
};

export const getSearchHistoryByUid = async (uid) => {
  const q = junctionUserSearchHistoryQuery(uid);

  return getJunctionDocs(q, async (doc) => {
    const {searchUserId, createdAt} = doc.data();
    const docRef = userDocRef(searchUserId).withConverter(
      searchHistoryItemConverter
    );
    const snapshot = await getDoc(docRef);
    const searchHistoryUser = await getDocData(snapshot);
    return {
      ...searchHistoryUser,
      createdAt: createdAt.toDate(),
    };
  });
};

export const getStoryCategoriesByUid = async (uid) => {
  const q = junctionUserStoryCategoryQuery(uid);

  return getJunctionDocs(q, async (doc) => {
    const {storyCategoryId} = doc.data();
    const docRef = storyCategoryDocRef(storyCategoryId);
    const snapshot = await getDoc(docRef);
    return getDocData(snapshot);
  });
};

export const getAllJunctionUserSearchHistoryByUid = async (uid) => {
  const q = junctionUserSearchHistoryQuery(uid);

  return getAllDocsByQuery(q);
};

export const addNewUserDoc = async (uid, data) => {
  try {
    const ref = userDocRef(uid);
    await setDoc(ref, data);
  } catch (error) {
    console.log(error);
  }
};

export const addJunctionUserSearchHistory = async ({uid, searchUserId}) => {
  const junctionObj = {
    uid,
    searchUserId,
  };

  const ref = junctionUserSearchHistoryDocRef(junctionObj);

  const data = {
    ...junctionObj,
    createdAt: serverTimestamp(),
  };

  await addNewJunctionDoc(ref, data);
};

export const addJunctionUserSavedPost = async ({uid, savedPost}) => {
  const ref = junctionUserSavedPostDocRef({
    uid,
    savedPostId: savedPost.id,
  });

  const data = {
    ...savedPost,
    createdAt: serverTimestamp(),
  };

  await addNewJunctionDoc(ref, data);
};

export const addJunctionUserFollowingUser = async ({uid, followingUser}) => {
  const ref = junctionUserFollowingUserDocRef({
    uid,
    followingUserId: followingUser.id,
  });

  const data = {
    ...followingUser,
    createdAt: serverTimestamp(),
  };

  await addNewJunctionDoc(ref, data);
};

export const removeAllJunctionUserSearchHistoryByUid = async ({
  uid,
  searchUserIds,
}) => {
  try {
    const batch = writeBatch(db);

    const refs = searchUserIds.map((searchUserId) => {
      const ref = junctionUserSearchHistoryDocRef({
        uid,
        searchUserId,
      });
      return ref;
    });

    refs.forEach((ref) => batch.delete(ref));

    await batch.commit();
  } catch (error) {
    console.log(error);
  }
};

export const removeJunctionUserSearchHistory = async ({uid, searchUserId}) => {
  try {
    const ref = junctionUserSearchHistoryDocRef({
      uid,
      searchUserId,
    });

    await deleteDoc(ref);
  } catch (error) {
    console.log(error);
  }
};

export const removeJunctionUserSavedPost = async ({uid, savedPostId}) => {
  try {
    const ref = junctionUserSavedPostDocRef({
      uid,
      savedPostId,
    });

    await deleteDoc(ref);
  } catch (error) {
    console.log(error);
  }
};

export const removeJunctionUserRequestSender = async ({
  uid,
  requestSenderId,
}) => {
  try {
    const ref = junctionUserRequestSenderDocRef({
      uid,
      requestSenderId,
    });

    await deleteDoc(ref);
  } catch (error) {
    console.log(error);
  }
};

export const removeJunctionUserFollowingUser = async ({
  uid,
  followingUserId,
}) => {
  try {
    const ref = junctionUserFollowingUserDocRef({
      uid,
      followingUserId,
    });

    await deleteDoc(ref);
  } catch (error) {
    console.log(error);
  }
};

export const confirmRequest = async ({uid, requestSenderId}) => {
  try {
    // Get a new write batch
    const batch = writeBatch(db);

    const userRequestSenderDocRef = junctionUserRequestSenderDocRef({
      uid,
      requestSenderId,
    });

    // Remove from request sender
    batch.delete(userRequestSenderDocRef);

    // user with requestSenderId follows user with auth.authUser.id
    const itemToAdd = {
      uid: requestSenderId,
      followingUserId: uid,
    };

    const userFollowingUserDocRef = junctionUserFollowingUserDocRef({
      uid: requestSenderId,
      followingUserId: uid,
    });

    // Add to following user collection
    batch.set(userFollowingUserDocRef, itemToAdd);

    // Commit the batch
    await batch.commit();
  } catch (error) {
    console.log(error);
  }
};

export const getUserDoc = async (uid) => {
  try {
    const ref = userDocRef(uid);
    const doc = await getDoc(ref);
    return getDocData(doc);
  } catch (error) {
    console.log(error);
  }
};

export const updateJunctionUserSearchHistory = async ({uid, searchUserId}) => {
  try {
    const ref = junctionUserSearchHistoryDocRef({
      uid,
      searchUserId,
    });

    const data = {
      createdAt: serverTimestamp(),
    };

    await updateDoc(ref, data);
  } catch (error) {
    console.log(error);
  }
};
