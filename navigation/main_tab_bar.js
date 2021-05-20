import React from 'react';
// import { Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../components/home';
import Search from '../components/search';
import NewPost from '../components/newpost';
import Activity from '../components/activity';
import Profile from '../components/profile';

const Tab = createBottomTabNavigator();

const MainTabBar = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      {/* Eventually, the Home tab will point to either Home or HomeLimited, depending
        on whether the user is logged in. initialRouteName above will need to alternate based on
        authentication status as well. */}
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Post" component={NewPost} />
      <Tab.Screen name="Activity" component={Activity} />
      <Tab.Screen name="Profile" component={Profile} />

    </Tab.Navigator>
  );
};

export default MainTabBar;
