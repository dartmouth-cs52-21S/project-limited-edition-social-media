import axios from 'axios';
import { AsyncStorage } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// keys for actiontypes
export const ActionTypes = {
  // Think of as FETCH_POSTS_SUCCEEDED
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  ERROR_SET: 'ERROR_SET',
  AUTH_USER: 'AUTH_USER',
  FETCH_USER: 'FETCH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
};

// lmited is not a typo do not change.
// export const ROOT_URL = 'https://lmited-edition-socialmedia-api.herokuapp.com/api';
export const ROOT_URL = 'http://localhost:9090/api';
/// IMPORTANT! API CALLS ONLY IN HERE, NOWHERE ELSE

// Learned about axios calls from https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/

// We want a function that gets all posts
export function fetchPosts() {
  return (dispatch) => {
    // here is where we do asynch axios calls
    // on completion of which we dispatch a new action, we can dispatch stuff now
    axios.get(`${ROOT_URL}/posts`).then((response) => {
      // we dispactch the action to fetch all posts, making the payload the data we get back from the api server
      dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
    }).catch((error) => {
      // hit an error do something else!
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}

export function createPost(post, history) {
  /* axios post */
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts`, post, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      // I think this is all we need to do? Do we need to refetch the posts?
      history.push('/');
    }).catch((error) => {
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}

export function updatePost(id, fields) {
  /* axios put */
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}`, fields, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
    }).catch((error) => {
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}

export function fetchPost(id) {
  /* axios get */
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
    }).catch((error) => {
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}

export function deletePost(id, history) {
  /* axios delete */
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      history.push('/');
    }).catch((error) => {
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}

// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export function signinUser({ email, password }, navigation) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  // does an axios.post on the /signin endpoint
  // on success does:
  //  dispatch({ type: ActionTypes.AUTH_USER });
  //  localStorage.setItem('token', response.data.token);
  // on error should dispatch(authError(`Sign In Failed: ${error.response.data}`));

  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password }).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER });
      storeData(response.data.token);
      // localStorage.setItem('token', response.data.token);
      navigation.replace('MainTab');
    }).catch((error) => {
      dispatch(authError(`Sign In Failed: ${error.response.data}`));
    });
  };
}

export function signupUser({
  email, password, displayname, username,
}, navigation) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  // does an axios.post on the /signup endpoint (only difference from above)
  // on success does:
  //  dispatch({ type: ActionTypes.AUTH_USER });
  //  localStorage.setItem('token', response.data.token);
  // on error should dispatch(authError(`Sign Up Failed: ${error.response.data}`));
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, {
      email, password, displayname, username,
    }).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER });
      storeData(response.data.token);
      // localStorage.setItem('token', response.data.token);
      navigation.replace('MainTab');
    }).catch((error) => {
      console.log(error.response.data);
      dispatch(authError(`Sign In Failed: ${error.response.data}`));
    });
  };
}

// deletes token from localstorage
// and deauths
export function signoutUser(navigation) {
  return (dispatch) => {
    removeData();
    dispatch({ type: ActionTypes.DEAUTH_USER });
    navigation.replace('HomeLimited');
  };
}

export function profileUser() {
  return async (dispatch) => {
    const headers = { authorization: await AsyncStorage.getItem('token') };
    axios.post(`${ROOT_URL}/profile`, {}, { headers }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_USER, payload: response.data });
    }).catch((error) => {
      console.error(`Profile failed with error: ${error}`);
      dispatch(authError(`profile failed: ${error.response.data}`));
    });
  };
}

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('token', value);
  } catch (e) {
    // saving error
  }
};

const removeData = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (e) {
    // remove error
  }
};
