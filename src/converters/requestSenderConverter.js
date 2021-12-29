class RequestSender {
  constructor(id, username, name, avatar, profile, createdAt) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.avatar = avatar;
    this.profile = profile;
    this.createdAt = createdAt;
  }
}

const requestSenderConverter = {
  toFirestore: (requestSender) => {
    return {
      id: requestSender.id,
      username: requestSender.username,
      name: requestSender.name,
      avatar: requestSender.avatar,
      profile: requestSender.profile,
      createdAt: requestSender.createdAt,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new RequestSender(
      data.id,
      data.username,
      data.name,
      data.avatar,
      data.profile,
      data.createdAt
    );
  },
};

export default requestSenderConverter;
