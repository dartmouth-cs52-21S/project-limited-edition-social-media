import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../components/home';
import Search from '../components/search';
import NewPostTab from './new_post_tab';
import Activity from '../components/activity';
import Profile from '../components/profile';
import Settings from '../components/settings';
import OtherUserProfile from '../components/other_user_profile';

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

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
      <Stack.Screen name="OtherUserProfile" component={OtherUserProfile} />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="OtherUserProfile" component={OtherUserProfile} />
    </Stack.Navigator>
  );
};

const MainTabBar = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      {/* Eventually, the Home tab will point to either Home or HomeLimited, depending
        on whether the user is logged in. initialRouteName above will need to alternate based on
        authentication status as well. */}
      {/* <Tab.Screen name="Home" component={Home} /> */}
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Search" component={SearchStack} />
      <Tab.Screen name="Post" component={NewPostTab} options={{ tabBarVisible: false }} />
      <Tab.Screen name="Activity" component={Activity} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default MainTabBar;
