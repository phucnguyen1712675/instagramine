class LikedUser {
  constructor(id, name, avatar) {
    this.id = id;
    this.name = name;
    this.avatar = avatar;
  }
}

const likedUserConverter = {
  toFirestore: (likedUser) => {
    return {
      name: likedUser.name,
      avatar: likedUser.avatar,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new LikedUser(snapshot.id, data.name, data.avatar);
  },
};

export default likedUserConverter;
