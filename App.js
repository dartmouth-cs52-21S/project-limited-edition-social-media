import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar, LogBox } from 'react-native';
import AppLoading from 'expo-app-loading';
// eslint-disable-next-line camelcase
import { useFonts, ZhiMangXing_400Regular } from '@expo-google-fonts/zhi-mang-xing';
import { ActionTypes } from './actions';
import Home from './navigation/home';
import PostMaximized from './components/post_maximized';
import HomeLimited from './components/home_limited';
import SignIn from './components/signin';
import SignUp from './components/signup';
import MainTabBar from './navigation/main_tab_bar';
import reducers from './reducers';
import NewPostTab from './navigation/new_post_tab';
import ProfilePhoto from './components/profile_photo';

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
));

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      store.dispatch({ type: ActionTypes.AUTH_USER });
    }
  } catch (e) {
    // error reading value
  }
};

getData();

const App = (props) => {
  const [fontsLoaded] = useFonts({
    ZhiMangXing_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <PaperProvider>
      <StatusBar barStyle="white-content" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="HomeLimited"
            screenOptions={{
              headerShown: false,
            }}
          >
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
            <Stack.Screen
              name="Home"
              component={Home}
            />
            <Stack.Screen
              name="PostFullScreen"
              component={PostMaximized}
            />
            <Stack.Screen name="Post"
              component={NewPostTab}
            />
            <Stack.Screen name="profilePhoto"
              component={ProfilePhoto}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </PaperProvider>
  );
};

export default App;

// we now wrap App in a Provider
// AppRegistry.registerComponent(appName, () => RNRedux);
