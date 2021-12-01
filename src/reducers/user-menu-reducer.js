import {SET_SHOULD_BIO_READ_MORE} from '../actions/user-menu-actions';

export default (state, action) => {
  switch (action.type) {
    case SET_SHOULD_BIO_READ_MORE:
      return {
        ...state,
        shouldBioReadMore: action.payload.shouldBioReadMore,
        bioCharsToShow: action.payload.bioCharsToShow,
      };
    default:
      return state;
  }
};
