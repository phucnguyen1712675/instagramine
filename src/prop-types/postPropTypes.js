import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    profile: PropTypes.string.isRequired,
    hasStory: PropTypes.bool.isRequired,
    hasStoryBeenSeen: function (props, propName, componentName) {
      if (
        props['hasStory'] &&
        (props[propName] == undefined || typeof props[propName] != 'boolean')
      ) {
        return new Error(
          `Please provide 'hasStoryBeenSeen' prop for ${componentName}!`
        );
      }
    },
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
  }),
  location: PropTypes.string.isRequired,
  media: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      duration: PropTypes.number,
    })
  ).isRequired,
  isLiked: PropTypes.bool.isRequired,
  isSaved: PropTypes.bool.isRequired,
  likedUsersLink: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  likedUsers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    })
  ).isRequired,
  fakeLikedOtherUserAvatars: PropTypes.arrayOf(PropTypes.string).isRequired,
  fakeLikeAmount: PropTypes.number.isRequired,
});
