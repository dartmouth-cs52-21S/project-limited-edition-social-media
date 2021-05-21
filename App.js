import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import HomeLimited from './components/home_limited';
import SignIn from './components/signin';
import SignUp from './components/signup';
import MainTabBar from './navigation/main_tab_bar';
import reducers from './reducers';
// import { name as appName } from './app.json';

// disable really annoying in app warnings
// console.disableYellowBox = true;

const Stack = createStackNavigator();

const store = createStore(reducers, {}, compose(
  // Middleware are basically functions that run between other stuff?
  // Now ActionCreaters can return thinks rather than actions, these thunks are functions that are created on the fly to run something later. Hmmm
  // Okok so rather than just an intent to change something or do something, it actually does something before dispatching an action to reducer.
  // A redux thunk allows your ActionCreators to return functions that can then dispatch actions.
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
));

const App = (props) => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeLimited">
          <Stack.Screen
            name="HomeLimited"
            component={HomeLimited}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
          />
          <Stack.Screen
            name="MainTab"
            component={MainTabBar}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  );
};

export default App;

// const token = localStorage.getItem('token');
// if (token) {
//   store.dispatch({ type: ActionTypes.AUTH_USER });
// }

// we now wrap App in a Provider
// AppRegistry.registerComponent(appName, () => RNRedux);
