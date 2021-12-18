import {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR,
} from '../actions/use-firestore-query-actions';

export default (state, action) => {
  switch (action.type) {
    case IDLE:
      return {status: 'idle', data: undefined, error: undefined};
    case LOADING:
      return {status: 'loading', data: undefined, error: undefined};
    case SUCCESS:
      return {status: 'success', data: action.payload, error: undefined};
    case ERROR:
      return {status: 'error', data: undefined, error: action.payload};
    default:
      throw new Error('invalid action');
  }
};
