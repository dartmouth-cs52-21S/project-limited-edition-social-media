import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeLimited from './components/home_limited';
import SignIn from './components/signin';
import SignUp from './components/signup';
import MainTabBar from './navigation/main_tab_bar';

// disable really annoying in app warnings
// console.disableYellowBox = true;

const Stack = createStackNavigator();

const App = (props) => {
  return (
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

  );
};

export default App;
