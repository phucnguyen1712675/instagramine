import {
  SET_IS_LOADING,
  SET_CHECKED,
  SET_SHOW_REQUESTS,
  SET_REQUEST_SENDERS,
  SET_REQUEST_SENDERS_AFTER_LOADING,
  REMOVE_REQUEST_SENDER,
} from '../actions/notificationButtonActions';

export default (state, action) => {
  switch (action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_CHECKED:
      return {
        ...state,
        checked: action.payload,
      };
    case SET_SHOW_REQUESTS:
      return {
        ...state,
        showRequests: action.payload,
      };
    case SET_REQUEST_SENDERS:
      return {
        ...state,
        requestSenders: action.payload,
      };
    case SET_REQUEST_SENDERS_AFTER_LOADING:
      return {
        ...state,
        isLoading: false,
        requestSenders: action.payload,
      };
    case REMOVE_REQUEST_SENDER:
      return {
        ...state,
        requestSenders: state.requestSenders.filter(
          (requestSender) => requestSender.id !== action.payload
        ),
      };
    default:
      throw new Error('invalid action');
  }
};
