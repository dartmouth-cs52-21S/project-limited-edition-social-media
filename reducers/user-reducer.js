import { ActionTypes } from '../actions';

// PostReducer will currently only need to respond to 2 ActionTypes: FETCH_POSTS and FETCH_POST

const initialState = {
  archivedFeed: []
};

// Learned about spread operator from https://redux.js.org/recipes/using-object-spread-operator
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_ARCHIVES:
      return { ...state, archivedFeed: action.payload };
    default:
      return state;
  }
};

export default userReducer;
