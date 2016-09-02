import { ActionTypes } from '../actions';

const AuthReducer = (state = { authenticated: false, email: '', error: '' }, action) => {
  const uniqueAuthID = Math.random();
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return { authenticated: true, email: action.payload, error: 'none' };
    case ActionTypes.FB_AUTH:
      return { authenticated: true, facebookUserID: action.payload, error: 'none' };
    case ActionTypes.AUTH_ERROR:
      return { authenticated: false, email: state.email, error: `${uniqueAuthID}` };
    case ActionTypes.DEAUTH_USER:
      return { authenticated: false, email: state.email, error: 'none' };
    default:
      return state;
  }
};

export default AuthReducer;
