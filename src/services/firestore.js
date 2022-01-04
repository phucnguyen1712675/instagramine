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
  try {
    delete data.id;
    removeUndefinedFields(data);
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

export const getSavedPostsByUid = async (uid) => {
  const q = junctionUserSavedPostQueryByUid(uid);

  return getJunctionDocs(q, async (doc) => {
    const {postId, createdAt} = doc.data();
    const docRef = postDocRef(postId);
    const snapshot = await getDoc(docRef);
    const savedPost = await getDocData(snapshot);

    return {
      ...savedPost,
      createdAt: createdAt.toDate(),
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

export const addJunctionUserLikedPost = async ({uid, likedPostId}) => {
  const junctionObj = {
    uid,
    likedPostId,
  };

  const ref = junctionUserLikedPostDocRef(junctionObj);

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
  try {
    const batch = writeBatch(db);

    const refs = searchUserIds.map((searchUserId) =>
      junctionUserSearchHistoryDocRef({
        uid,
        searchUserId,
      })
    );

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

export const removeJunctionUserLikedPost = async ({uid, likedPostId}) => {
  try {
    const ref = junctionUserLikedPostDocRef({
      uid,
      likedPostId,
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

export const getPostsAtHomeContent = async (uid) => {
  try {
    const q = postsAtHomeContentQuery();
    const snapshot = await getDocs(q);
    const postsData = await getCollectionData(snapshot.docs);
    const junctionUserLikedPosts = await getAllJunctionUserLikedPostByUid(uid);
    const junctionUserSavedPosts = await getAllJunctionUserSavedPostByUid(uid);

    let posts = await Promise.all(
      postsData.map(async (post) => {
        const ownerData = await getUserDoc(post.ownerId);
        const junctionQ = junctionUserLikedPostQueryByPostId(post.id);

        const likedUsersData = await getJunctionDocs(junctionQ, async (doc) => {
          const {uid, createdAt} = doc.data();
          const docRef = userDocRef(uid).withConverter(likedUserConverter);
          const snapshot = await getDoc(docRef);
          const likedUser = await getDocData(snapshot);

          return {
            ...likedUser,
            createdAt: createdAt.toDate(),
          };
        });

        return {
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
        };
      })
    );

    posts = posts.map((post) => {
      const postId = post.id;
      const isLiked = junctionUserLikedPosts.some(
        (junctionUserLikedPost) => junctionUserLikedPost.likedPostId === postId
      );
      const isSaved = junctionUserSavedPosts.some(
        (junctionUserSavedPost) => junctionUserSavedPost.savedPostId === postId
      );

      return {
        ...post,
        isLiked,
        isSaved,
      };
    });

    // Fake data
    posts = posts.map((post) => {
      const postOwnerId = post.ownerId;
      const indexOfPostByOwnerId = fakePostData.findIndex(
        (post) => post.ownerId === postOwnerId
      );

      if (indexOfPostByOwnerId === -1) {
        return post;
      }

      const fakePost = fakePostData[indexOfPostByOwnerId];

      return {
        ...post,
        fakeLikedOtherUserAvatars: fakePost.fakeLikedOtherUserAvatars,
        fakeLikeAmount: fakePost.fakeLikeAmount,
      };
    });

    return posts;
  } catch (error) {
    console.log(error);
  }
};
