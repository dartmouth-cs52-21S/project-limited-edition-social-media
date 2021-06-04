import React from 'react';
// import { Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../components/home';
import Search from '../components/search';
import NewPostTab from './new_post_tab';
import Activity from '../components/activity';
import Profile from '../components/profile';
import Settings from '../components/settings';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

const MainTabBar = () => {
  return (
    <Tab.Navigator initialRouteName="Home"
      tabBarOptions={{
        tabStyle: {
          justifyContent: 'center',
        },
        showIcon: false,
      }}
    >
      {/* Eventually, the Home tab will point to either Home or HomeLimited, depending
        on whether the user is logged in. initialRouteName above will need to alternate based on
        authentication status as well. */}
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Post" component={NewPostTab} options={{ tabBarVisible: false }} />
      <Tab.Screen name="Activity" component={Activity} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default MainTabBar;
