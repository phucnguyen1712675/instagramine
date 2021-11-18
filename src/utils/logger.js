export default (reducer) => (state, action) => {
  console.group(action.type);

  console.log('prevState: ', state);

  const newState = reducer(state, action);

  console.log('newState: ', newState);

  console.groupEnd();

  return newState;
};
