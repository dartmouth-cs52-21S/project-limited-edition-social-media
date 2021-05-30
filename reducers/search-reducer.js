import { ActionTypes } from '../actions';


const initialState = {
  searchedUsers = []
};

// Learned about spread operator from https://redux.js.org/recipes/using-object-spread-operator
const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FIND_USER:
    return { ...state, searchedUsers: action.payload };
    default:
      return state;
  }
};

export default searchReducer;

