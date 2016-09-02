import { combineReducers } from 'redux';
import UserReducer from './user-reducer.js';
import AuthReducer from './auth-reducer';
import SnapReducer from './snap-reducer';

const allReducers = combineReducers({
  auth: AuthReducer,
  snaps: SnapReducer,
  user: UserReducer,
});

export default allReducers;
