import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.number.isRequired,
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
  username: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  media: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
  isLiked: PropTypes.bool.isRequired,
  isSaved: PropTypes.bool.isRequired,
  likedUser: PropTypes.string.isRequired,
  likedOtherUser: PropTypes.arrayOf(PropTypes.string).isRequired,
  likeAmount: PropTypes.number.isRequired,
  likedUsersLink: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
});
