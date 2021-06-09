import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import password from './password/reducer';

export default combineReducers({
  auth,
  user,
  password,
});
