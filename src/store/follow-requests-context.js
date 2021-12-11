import {useState, createContext} from 'react';
import PropTypes from 'prop-types';
import followRequestsData from '../data/follow-requests.json';

const initialState = {
  followRequests: [],
  // eslint-disable-next-line no-unused-vars
  confirmRequest: (userId) => {},
  // eslint-disable-next-line no-unused-vars
  removeRequest: (userId) => {},
};

const FollowRequestsContext = createContext(initialState);

export const FollowRequestsContextProvider = ({children}) => {
  const [followRequests, setFollowRequests] = useState(followRequestsData);

  // eslint-disable-next-line no-unused-vars
  const confirmRequest = (userId) => {};

  const removeRequest = (userId) => {
    setFollowRequests((prevRequests) =>
      prevRequests.filter((user) => user.id !== userId)
    );
  };

  const context = {
    followRequests,
    confirmRequest,
    removeRequest,
  };

  return (
    <FollowRequestsContext.Provider value={context}>
      {children}
    </FollowRequestsContext.Provider>
  );
};

FollowRequestsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FollowRequestsContext;
