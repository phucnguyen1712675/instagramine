class SearchHistoryItem {
  constructor(
    id,
    username,
    name,
    avatar,
    profile,
    hasStory,
    hasStoryBeenSeen,
    createdAt
  ) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.avatar = avatar;
    this.profile = profile;
    this.hasStory = hasStory;
    this.hasStoryBeenSeen = hasStoryBeenSeen;
    this.createdAt = createdAt;
  }
}

const searchHistoryItemConverter = {
  toFirestore: (searchHistoryItem) => {
    return {
      username: searchHistoryItem.username,
      name: searchHistoryItem.name,
      avatar: searchHistoryItem.avatar,
      profile: searchHistoryItem.profile,
      hasStory: searchHistoryItem.hasStory,
      hasStoryBeenSeen: searchHistoryItem.hasStoryBeenSeen,
      createdAt: searchHistoryItem.createdAt,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new SearchHistoryItem(
      snapshot.id,
      data.username,
      data.name,
      data.avatar,
      data.profile,
      data.hasStory,
      data.hasStoryBeenSeen
    );
  },
};

export default searchHistoryItemConverter;
