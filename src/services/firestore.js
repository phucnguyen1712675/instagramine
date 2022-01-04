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
  runTransaction,
} from 'firebase/firestore';
import {db} from '../firebase-config';
import {MAX_STORIES_NUMBER} from '../constants';
import {
  searchHistoryItemConverter,
  requestSenderConverter,
  likedUserConverter,
} from '../converters';
import fakePostData from '../data/posts.json';
import {getCollectionData, getDocData} from '../utils/firestore';
import {removeUndefinedFields} from '../utils/object';

// Collection paths
export const usersColRef = collection(db, 'users');
export const postsColRef = collection(db, 'posts');
export const storyCategoriesColRef = collection(db, 'story_categories');
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
export const junctionUserLikedPost = collection(db, 'junction_user_liked_post');

// Document paths
export const userDocRef = (uid) => doc(db, `users/${uid}`);
export const postDocRef = (id) => doc(db, `posts/${id}`);
export const storyCategoryDocRef = (storyCategoryId) =>
  doc(db, `story_categories/${storyCategoryId}`);
export const junctionUserSearchHistoryDocRef = ({uid, searchUserId}) =>
  doc(db, `junction_user_search_history/${uid}_${searchUserId}`);
export const junctionUserLikedPostDocRef = ({uid, likedPostId}) =>
  doc(db, `junction_user_liked_post/${uid}_${likedPostId}`);
export const junctionUserSavedPostDocRef = ({uid, savedPostId}) =>
  doc(db, `junction_user_saved_post/${uid}_${savedPostId}`);
export const junctionUserRequestSenderDocRef = ({uid, requestSenderId}) =>
  doc(db, `junction_user_request_sender/${uid}_${requestSenderId}`);
export const junctionUserFollowingUserDocRef = ({uid, followingUserId}) =>
  doc(db, `junction_user_following_user/${uid}_${followingUserId}`);

// Query paths
export const junctionUserRequestSenderQuery = (uid) =>
  query(
    junctionUserRequestSenderColRef,
    where('uid', '==', uid),
    orderBy('createdAt', 'desc')
  );
export const junctionUserSearchHistoryQuery = (uid) =>
  query(
    junctionUserSearchHistoryColRef,
    where('uid', '==', uid),
    orderBy('createdAt', 'desc')
  );
export const junctionUserFollowingUserQuery = (uid) =>
  query(junctionUserFollowingUserColRef, where('uid', '==', uid));
export const junctionUserSavedPostQueryByUid = (uid) =>
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
export const postsAtHomeContentQuery = () =>
  query(postsColRef, orderBy('createdAt', 'desc'), limit(20));
export const junctionUserLikedPostQueryByUid = (uid) =>
  query(junctionUserLikedPost, where('uid', '==', uid));
export const junctionUserLikedPostQueryByPostId = (likedPostId) =>
  query(
    junctionUserLikedPost,
    where('likedPostId', '==', likedPostId),
    orderBy('createdAt', 'desc'),
    limit(20)
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

const addNewJunctionDoc = async (docRef, data) => {
  delete data.id;
  removeUndefinedFields(data);
  try {
    await setDoc(docRef, data);
  } catch (error) {
    console.log(error);
  }
};

// Custom Functions
export const getAllJunctionUserSavedPostByUid = async (uid) => {
  const q = junctionUserSavedPostQueryByUid(uid);

  return getJunctionDocs(q, async (doc) => {
    const docData = doc.data();

    return {
      ...docData,
      createdAt: docData.createdAt.toDate(),
    };
  });
};

export const getRequestSendersByUid = async (uid) => {
  const q = junctionUserRequestSenderQuery(uid);

  return getJunctionDocs(q, async (doc) => {
    const {requestSenderId, createdAt} = doc.data();
    const docRef = userDocRef(requestSenderId).withConverter(
      requestSenderConverter
    );
    const snapshot = await getDoc(docRef);
    const requestSender = await getDocData(snapshot);

    return {
      ...requestSender,
      createdAt: createdAt.toDate(),
    };
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
    const {storyCategoryId, views} = doc.data();
    const docRef = storyCategoryDocRef(storyCategoryId);
    const snapshot = await getDoc(docRef);
    const storyCategory = await getDocData(snapshot);

    return {
      ...storyCategory,
      views,
    };
  });
};

export const getAllJunctionUserLikedPostByUid = async (uid) => {
  const q = junctionUserLikedPostQueryByUid(uid);

  return getJunctionDocs(q, async (doc) => {
    const docData = doc.data();

    return {
      ...docData,
      createdAt: docData.createdAt.toDate(),
    };
  });
};

export const getLikedUsersByPostId = async (likedPostId) => {
  const q = junctionUserLikedPostQueryByPostId(likedPostId);

  return getJunctionDocs(q, async (doc) => {
    const {uid, createdAt} = doc.data();
    const docRef = userDocRef(uid).withConverter(likedUserConverter);
    const snapshot = await getDoc(docRef);
    const likedUser = await getDocData(snapshot);

    return {
      ...likedUser,
      createdAt: createdAt.toDate(),
    };
  });
};

export const addNewUserDoc = async (uid, data) => {
  const ref = userDocRef(uid);
  try {
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

export const addJunctionUserSavedPost = async ({uid, savedPostId}) => {
  const junctionObj = {
    uid,
    savedPostId,
  };

  const ref = junctionUserSavedPostDocRef(junctionObj);

  const data = {
    ...junctionObj,
    createdAt: serverTimestamp(),
  };

  await addNewJunctionDoc(ref, data);
};

export const addJunctionUserFollowingUser = async ({uid, followingUserId}) => {
  const junctionObj = {
    uid,
    followingUserId,
  };

  const ref = junctionUserFollowingUserDocRef(junctionObj);

  const data = {
    ...junctionObj,
    createdAt: serverTimestamp(),
  };

  await addNewJunctionDoc(ref, data);
};

export const removeAllJunctionUserSearchHistoryByUid = async ({
  uid,
  searchUserIds,
}) => {
  const refs = searchUserIds.map((searchUserId) =>
    junctionUserSearchHistoryDocRef({
      uid,
      searchUserId,
    })
  );

  try {
    const batch = writeBatch(db);

    refs.forEach((ref) => batch.delete(ref));

    await batch.commit();
  } catch (error) {
    console.log(error);
  }
};

export const removeJunctionUserSearchHistory = async ({uid, searchUserId}) => {
  const ref = junctionUserSearchHistoryDocRef({
    uid,
    searchUserId,
  });
  try {
    await deleteDoc(ref);
  } catch (error) {
    console.log(error);
  }
};

export const removeJunctionUserSavedPost = async ({uid, savedPostId}) => {
  const ref = junctionUserSavedPostDocRef({
    uid,
    savedPostId,
  });
  try {
    await deleteDoc(ref);
  } catch (error) {
    console.log(error);
  }
};

export const removeJunctionUserRequestSender = async ({
  uid,
  requestSenderId,
}) => {
  const ref = junctionUserRequestSenderDocRef({
    uid,
    requestSenderId,
  });
  try {
    await deleteDoc(ref);
  } catch (error) {
    console.log(error);
  }
};

export const removeJunctionUserFollowingUser = async ({
  uid,
  followingUserId,
}) => {
  const ref = junctionUserFollowingUserDocRef({
    uid,
    followingUserId,
  });
  try {
    await deleteDoc(ref);
  } catch (error) {
    console.log(error);
  }
};

export const confirmRequest = async ({uid, requestSenderId}) => {
  const userRequestSenderDocRef = junctionUserRequestSenderDocRef({
    uid,
    requestSenderId,
  });

  // user with requestSenderId follows user with auth.authUser.id
  const junctionObj = {
    uid: requestSenderId,
    followingUserId: uid,
  };

  const userFollowingUserDocRef = junctionUserFollowingUserDocRef(junctionObj);

  const data = {
    ...junctionObj,
    createdAt: serverTimestamp(),
  };

  try {
    // Get a new write batch
    const batch = writeBatch(db);

    // Remove from request sender
    batch.delete(userRequestSenderDocRef);

    // Add to following user collection
    batch.set(userFollowingUserDocRef, data);

    // Commit the batch
    await batch.commit();
  } catch (error) {
    console.log(error);
  }
};

export const likePostRequest = async ({uid, likedPostId}) => {
  const postRef = postDocRef(likedPostId);

  const junctionObj = {
    uid,
    likedPostId,
  };

  const junctionRef = junctionUserLikedPostDocRef(junctionObj);

  const junctionData = {
    ...junctionObj,
    createdAt: serverTimestamp(),
  };

  try {
    await runTransaction(db, async (transaction) => {
      const postDoc = await transaction.get(postRef);

      if (!postDoc.exists()) {
        throw 'Document does not exist!';
      }

      const newLikeAmount = postDoc.data().likeAmount + 1;

      // Update like amount
      transaction.update(postRef, {likeAmount: newLikeAmount});

      // Add to junction user liked post
      transaction.set(junctionRef, junctionData);
    });
  } catch (error) {
    console.log('Transaction failed: ', error);
  }
};

export const unlikePostRequest = async ({uid, likedPostId}) => {
  const postRef = postDocRef(likedPostId);

  const junctionObj = {
    uid,
    likedPostId,
  };

  const junctionRef = junctionUserLikedPostDocRef(junctionObj);

  try {
    await runTransaction(db, async (transaction) => {
      const postDoc = await transaction.get(postRef);

      if (!postDoc.exists()) {
        throw 'Document does not exist!';
      }

      const newLikeAmount = postDoc.data().likeAmount - 1;

      // Update like amount
      transaction.update(postRef, {likeAmount: newLikeAmount});

      // Remove to junction user liked post
      transaction.delete(junctionRef);
    });
  } catch (error) {
    console.log('Transaction failed: ', error);
  }
};

export const getUserDoc = async (uid) => {
  const ref = userDocRef(uid);
  try {
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

export const getPostsAtHomeContent = async (uid) => {
  const q = postsAtHomeContentQuery();

  try {
    const snapshot = await getDocs(q);
    const postsData = await getCollectionData(snapshot.docs);
    const junctionUserLikedPosts = await getAllJunctionUserLikedPostByUid(uid);
    const junctionUserSavedPosts = await getAllJunctionUserSavedPostByUid(uid);

    const posts = await Promise.all(
      postsData.map(async (post) => {
        const postId = post.id;
        const postOwnerId = post.ownerId;
        const ownerData = await getUserDoc(postOwnerId);
        const junctionQ = junctionUserLikedPostQueryByPostId(postId);
        const likedUsersData = await getJunctionDocs(junctionQ, async (doc) => {
          const {uid} = doc.data();
          const docRef = userDocRef(uid).withConverter(likedUserConverter);
          const snapshot = await getDoc(docRef);
          const userData = await getDocData(snapshot);

          return userData;
        });
        const isLiked = junctionUserLikedPosts.some(
          (junctionUserLikedPost) =>
            junctionUserLikedPost.likedPostId === postId
        );
        const isSaved = junctionUserSavedPosts.some(
          (junctionUserSavedPost) =>
            junctionUserSavedPost.savedPostId === postId
        );
        const fakePost = fakePostData.find(
          (fakePost) => fakePost.ownerId === postOwnerId
        );

        const postData = {
          ...post,
          createdAt: post.createdAt.toDate(),
          owner: {
            username: ownerData.username,
            avatar: ownerData.avatar,
            profile: ownerData.profile,
            hasStory: ownerData.hasStory,
            hasStoryBeenSeen: ownerData.hasStoryBeenSeen ?? false,
            city: ownerData.city,
            country: ownerData.country,
          },
          likedUsers: likedUsersData,
          isLiked,
          isSaved,
          // Fake data
          fakeLikedOtherUserAvatars: fakePost?.fakeLikedOtherUserAvatars ?? [],
        };

        return postData;
      })
    );

    return posts;
  } catch (error) {
    console.log(error);
  }
};

export const getPostsAtSavedContent = async (uid) => {
  const q = junctionUserSavedPostQueryByUid(uid);

  const savedPosts = await getJunctionDocs(
    q,
    async (junctionUserSavedPostDoc) => {
      const {savedPostId} = junctionUserSavedPostDoc.data();
      const docRef = postDocRef(savedPostId);
      const snapshot = await getDoc(docRef);
      let postData = await getDocData(snapshot);
      const postOwnerId = postData.ownerId;
      const ownerData = await getUserDoc(postOwnerId);
      const junctionQ = junctionUserLikedPostQueryByPostId(savedPostId);

      const likedUsersData = await getJunctionDocs(
        junctionQ,
        async (junctionUserLikedPostDoc) => {
          const {uid} = junctionUserLikedPostDoc.data();
          const docRef = userDocRef(uid).withConverter(likedUserConverter);
          const snapshot = await getDoc(docRef);
          const user = await getDocData(snapshot);

          return user;
        }
      );
      const junctionUserLikedPosts = await getAllJunctionUserLikedPostByUid(
        uid
      );
      const isLiked = junctionUserLikedPosts.some(
        (junctionUserLikedPost) =>
          junctionUserLikedPost.likedPostId === savedPostId
      );
      const fakePost = fakePostData.find(
        (fakePost) => fakePost.ownerId === postOwnerId
      );

      postData = {
        ...postData,
        createdAt: postData.createdAt.toDate(),
        owner: {
          username: ownerData.username,
          avatar: ownerData.avatar,
          profile: ownerData.profile,
          hasStory: ownerData.hasStory,
          hasStoryBeenSeen: ownerData.hasStoryBeenSeen ?? false,
          city: ownerData.city,
          country: ownerData.country,
        },
        likedUsers: likedUsersData,
        isLiked,
        isSaved: true,
        // Fake data
        fakeLikedOtherUserAvatars: fakePost?.fakeLikedOtherUserAvatars ?? [],
      };

      return postData;
    }
  );

  return savedPosts;
};

export const setFakeFollowRequests = async (uid) => {
  const fakeFollowRequests = [
    'Brf3CNmBw6gy75mbwC9PhXClh533',
    '9VwYBMj3awUJE3rHOEY3QFoJtnH3',
    'RYTw194dNVRVIkcfX3r7SEEFr7p2',
    '4BGFnMC8NUSqoOYKeYYpenMfZ6w2',
    'yrzhh64fMFhheeHH7DQyyotvR3y1',
    'HorzlcMahcNAxfBSixYFg1uVvcR2',
    'DfWnNmOFNHTwBcIbCI8Gp9zX22c2',
  ];

  const refsAndData = fakeFollowRequests.map((requestSenderId) => {
    const junctionObj = {
      uid,
      requestSenderId,
    };

    return {
      ref: junctionUserRequestSenderDocRef(junctionObj),
      data: {
        ...junctionObj,
        createdAt: serverTimestamp(),
      },
    };
  });

  try {
    const batch = writeBatch(db);

    refsAndData.forEach(({ref, data}) => {
      batch.set(ref, data);
    });

    await batch.commit();
  } catch (error) {
    console.log(error);
  }
};
