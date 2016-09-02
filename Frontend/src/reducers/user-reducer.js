import { ActionTypes } from '../actions';

const UserReducer = (state = { user: [] }, action) => {
  switch (action.type) {
    case ActionTypes.GET_USER:
      return { user: action.payload };
    default:
      return state;
  }
};

export default UserReducer;
