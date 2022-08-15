import { combineReducers } from 'redux';
import user from './user_reducer';

const rootReducer = combineReducers({
  // reducer를 합쳐서 관리
  user,
});

export default rootReducer;
