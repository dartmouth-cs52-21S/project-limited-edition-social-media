import { ActionTypes } from '../actions';

// PostReducer will currently only need to respond to 2 ActionTypes: FETCH_POSTS and FETCH_POST

const initialState = {
  all: [],
  current: {},
  // Adding error state as well
  error: null,
};

// Learned about spread operator from https://redux.js.org/recipes/using-object-spread-operator
const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      return { ...state, all: action.payload };
    case ActionTypes.FETCH_POST:
      return { ...state, current: action.payload };
    case ActionTypes.ERROR_SET:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default PostReducer;
