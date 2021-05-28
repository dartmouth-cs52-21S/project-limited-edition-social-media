// import { ActionTypes } from '../actions';

const initialState = {
  displayname: '',
  username: '',
  email: '',
  followingList: [],
  followerList: [],
};

const UserReducer = (state = initialState, action) => {
  console.log('reached user reducer');
  switch (action.type) {
    // case ActionTypes.FETCH_USER:
    //   return {
    //     ...state,
    //     displayname: action.payload.displayname,
    //     followingList: action.payload.followingList,
    //     followerList: action.payload.followerList,
    //   };
    default:
      return state;
  }
};

export default UserReducer;
