import { ActionTypes } from '../actions';

export const initialState = {
  authenticated: false,
  error: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return { ...state, authenticated: true };
    case ActionTypes.DEAUTH_USER:
      return { ...state, authenticated: false };
    case ActionTypes.AUTH_ERROR:
      return { ...state, error: action.message, authenticated: false };
    case ActionTypes.CLEAR_AUTH_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default AuthReducer;
