import axios from 'axios';
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  CLEAR_AUTH_ERROR: 'CLEAR_AUTH_ERROR',
  UPDATE_FOLLOW: 'UPDATE_FOLLOW',
};

// lmited is not a typo do not change
export const ROOT_URL = 'https://lmited-edition-socialmedia-api.herokuapp.com/api';
// export const ROOT_URL = 'http://localhost:9090/api';
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
    }).catch((error) => dispatch({ type: ActionTypes.ERROR_SET, error }));
  };
}

export function createPost(navigation, post) {
  return (dispatch) => {
    // getting the auth token
    getData('token').then((token) => {
      // using auth token to create a post on the server
      axios.post(`${ROOT_URL}/posts`, post, { headers: { authorization: token } }).then((response) => {
        // reseting navigation for new_post_tab
        navigation.navigate('Camera');
        navigation.replace('Camera');
        // navigating to the home page
        navigation.navigate('Home');
        dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      }).catch((error) => dispatch({ type: ActionTypes.ERROR_SET, error }));
    });
  };
}

export function deletePost(id, history = null) {
  /* axios delete */
  return (dispatch) => {
    const url = `${ROOT_URL}/posts/${id}`;
    getData('token').then((authorization) => axios.delete(url, { headers: { authorization } }))
      .then((response) => {
        if (history) {
          history.push('/');
        }
      }).catch((error) => dispatch({ type: ActionTypes.ERROR_SET, error }));
  };
}

export function updatePost(id, fields) {
  /* axios put */
  return (dispatch) => {
    getData('token').then((authorization) => {
      axios.put(`${ROOT_URL}/posts/${id}`, fields, { headers: { authorization } }).then((response) => {
        dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
        if (response.data.item.currentViews >= response.data.item.viewLimit) {
          deletePost(id);
        }
      }).catch((error) => dispatch({ type: ActionTypes.ERROR_SET, error }));
    });
  };
}

export function fetchPost(id) {
  /* axios get */
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}`)
      .then(({ data: payload }) => dispatch({ type: ActionTypes.FETCH_POST, payload }))
      .catch((error) => dispatch({ type: ActionTypes.ERROR_SET, error }));
  };
}

// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  let errorMessage;
  if (error.response) {
    if (error.response.status === 401) {
      errorMessage = 'username/password does not exist';
    } else if (error.response.status === 422) {
      errorMessage = error.response.data.error;
    } else {
      errorMessage = error.response.data;
    }
  } else if (error.request) {
    errorMessage = error.request.responseText;
  } else {
    errorMessage = error;
  }

  return {
    type: ActionTypes.AUTH_ERROR,
    message: errorMessage,
  };
}

export function clearAuthError() {
  return {
    type: ActionTypes.CLEAR_AUTH_ERROR,
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
      storeData('token', response.data.token);
      // navigation.reset('MainTab');
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTab' }],
      });
    }).catch((error) => {
      dispatch(authError(error));
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
      storeData('token', response.data.token);
      // localStorage.setItem('token', response.data.token);
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTab' }],
      });
    }).catch((error) => {
      dispatch(authError(error));
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

// storing token locally
const storeData = async (dataName, value) => {
  try {
    await AsyncStorage.setItem(dataName, value);
  } catch (e) {
    // saving error
  }
};

// fetching local data
const getData = async (dataName) => {
  try {
    const value = await AsyncStorage.getItem(dataName);
    return value;
  } catch (e) {
    // saving error
    return e;
  }
};

const removeData = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (e) {
    // remove error
  }
};

export function profileUser() {
  return async (dispatch) => {
    const url = `${ROOT_URL}/profile`;
    getData('token').then((authorization) => axios.post(url, {}, { headers: { authorization } }))
      .then(({ data: payload }) => dispatch({ type: ActionTypes.FETCH_USER, payload }))
      .catch((error) => {
        console.error(`Profile failed with error: ${error}`);
        dispatch(authError(`profile failed: ${error.data}`));
      });
  };
}

export function profileUserWithUsername(username) {
  return async (dispatch) => {
    const url = `${ROOT_URL}/user/${username}`;
    getData('token').then((authorization) => axios.post(url, {}, { headers: { authorization } }))
      .then(({ data: payload }) => dispatch({ type: ActionTypes.FETCH_USER, payload }))
      .catch((error) => {
        console.error(`Viewing ${username} profile failed with error: ${error}`);
        dispatch(authError(`profile failed: ${error.data}`));
      });
  };
}

export function updateFollow(username) {
  return (dispatch) => {
    const url = `${ROOT_URL}/profile/follow/${username}`;
    getData('token').then((authorization) => axios.post(url, {}, { headers: { authorization } }))
      .catch((error) => {
        console.error(`Updating follow failed with error: ${error}`);
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function updateUnfollow(username) {
  return (dispatch) => {
    const url = `${ROOT_URL}/profile/unfollow/${username}`;
    getData('token').then((authorization) => axios.post(url, {}, { headers: { authorization } }))
      .catch((error) => {
        console.error(`Unfollow failed with error: ${error}`);
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function isFollowing(username) {
  return async (dispatch) => {
    const url = `${ROOT_URL}/profile/follow/${username}`;
    return getData('token').then((authorization) => axios.get(url, { headers: { authorization } }))
      .catch((error) => {
        console.error(`Get follow failed with error: ${error}`);
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function getSearchedUsers(profileName) {
  return axios.get(`${ROOT_URL}/search/${profileName}`);
}

export function updateProfileFieldVisibility(field) {
  return async (dispatch) => {
    const url = `${ROOT_URL}/user/${field}`;
    return getData('token').then((authorization) => axios.put(url, {}, { headers: { authorization } }));
  };
}

export function updateProfilePhoto(profileUrl) {
  return async (dispatch) => {
    const url = `${ROOT_URL}/profile`;
    return getData('token').then((authorization) => axios.put(url, { profileUrl }, { headers: { authorization } }));
  };
}
