import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  FieldValue,
  getDoc,
  limit,
  writeBatch,
} from 'firebase/firestore';
import {db} from '../firebase-config';
import {MAX_STORIES_NUMBER} from '../constants';
import {
  searchHistoryItemConverter,
  requestSenderConverter,
} from '../converters';
import {getCollectionData} from '../utils/firestore';

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
export const junctionUserStoryCategory = collection(
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
    junctionUserStoryCategory,
    where('uid', '==', uid),
    orderBy('views', 'desc'),
    limit(MAX_STORIES_NUMBER)
  );

// Functions
export const getSavedPostsByUid = async (uid) => {
  try {
    const q = junctionUserSavedPostQuery(uid);
    const junctions = await getDocs(q);

    const savedPosts = await Promise.all(
      junctions.docs
        .filter((doc) => doc.exists())
        .map((doc) => {
          const docRef = postDocRef(doc.data().postId);
          return getDoc(docRef);
        })
    );

    return savedPosts;
  } catch (error) {
    console.log(error);
  }
};

export const getAllJunctionUserRequestSenderByUid = async (uid) => {
  try {
    const q = junctionUserRequestSenderQuery(uid);
    const snapshot = await getDocs(q);

    return getCollectionData(snapshot.docs);
  } catch (error) {
    console.log(error);
  }
};

export const getRequestSendersByUid = async (uid) => {
  try {
    const q = junctionUserRequestSenderQuery(uid);
    const junctions = await getDocs(q);

    const requestSender = await Promise.all(
      junctions.docs
        .filter((doc) => doc.exists())
        .map((doc) => {
          const docRef = userDocRef(doc.data().requestSenderId).withConverter(
            requestSenderConverter
          );
          return getDoc(docRef);
        })
    );

    return requestSender;
  } catch (error) {
    console.log(error);
  }
};

export const getSearchHistoryByUid = async (uid) => {
  try {
    const q = junctionUserSearchHistoryQuery(uid);
    const junctions = await getDocs(q);

    const searchHistory = await Promise.all(
      junctions.docs
        .filter((doc) => doc.exists())
        .map((doc) => {
          const docRef = userDocRef(doc.data().searchUserId).withConverter(
            searchHistoryItemConverter
          );
          return getDoc(docRef);
        })
    );

    return searchHistory;
  } catch (error) {
    console.log(error);
  }
};

export const addJunctionUserSearchHistory = async ({uid, searchUser}) => {
  try {
    const ref = junctionUserSearchHistoryDocRef({
      uid,
      searchUserId: searchUser.id,
    });

    const data = {
      ...searchUser,
      createdAt: FieldValue.serverTimestamp(),
    };

    delete data.id;

    await setDoc(ref, data);
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

export const getAllJunctionUserSearchHistoryByUid = async (uid) => {
  try {
    const q = junctionUserSearchHistoryQuery(uid);
    const snapshot = await getDocs(q);

    return getCollectionData(snapshot.docs);
  } catch (error) {
    console.log(error);
  }
};

export const removeAllJunctionUserSearchHistoryByUid = async (uid) => {
  try {
    const junctions = await getAllJunctionUserSearchHistoryByUid(uid);

    await Promise.all(
      junctions.forEach((junction) => {
        const ref = junctionUserSearchHistoryDocRef(uid, junction.searchUserId);
        deleteDoc(ref);
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const addJunctionUserSavedPost = async ({uid, savedPost}) => {
  try {
    const ref = junctionUserSavedPostDocRef({
      uid,
      savedPostId: savedPost.id,
    });

    const data = {
      ...savedPost,
      createdAt: FieldValue.serverTimestamp(),
    };

    delete data.id;

    await setDoc(ref, data);
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

export const confirmRequest = async ({uid, requestSenderId}) => {
  try {
    // Get a new write batch
    const batch = writeBatch();

    // Remove from request sender
    batch.delete(
      junctionUserRequestSenderDocRef({
        uid,
        requestSenderId,
      })
    );

    // user with requestSenderId follows user with auth.authUser.id
    const itemToAdd = {
      uid: requestSenderId,
      followingUserId: uid,
    };

    // Add to following user collection
    batch.set(
      junctionUserFollowingUserDocRef({
        uid: requestSenderId,
        followingUserId: uid,
      }),
      itemToAdd
    );

    // Commit the batch
    await batch.commit();
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

export const addJunctionUserFollowingUser = async ({uid, followingUser}) => {
  try {
    const ref = junctionUserFollowingUserDocRef({
      uid,
      followingUserId: followingUser.id,
    });

    const data = {
      ...followingUser,
      createdAt: FieldValue.serverTimestamp(),
    };

    delete data.id;

    await setDoc(ref, data);
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

export const getStoryCategoriesByUid = async (uid) => {
  try {
    const q = junctionUserStoryCategoryQuery(uid);
    const junctions = await getDocs(q);

    const storyCategories = await Promise.all(
      junctions.docs
        .filter((doc) => doc.exists())
        .map((doc) => {
          const docRef = storyCategoryDocRef(doc.data().storyCategoryId);
          return getDoc(docRef);
        })
    );

    return storyCategories;
  } catch (error) {
    console.log(error);
  }
};
