// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';
import PostsReducer from './post-reducer';
import AuthReducer from './auth-reducer';
import UserReducer from './user-reducer';

const rootReducer = combineReducers({
  posts: PostsReducer,
  auth: AuthReducer,
  user: UserReducer,
});

export default rootReducer;
