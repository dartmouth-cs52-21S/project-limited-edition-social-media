import React from 'react';
// import { Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './home';
import Search from '../components/search';
import Activity from '../components/activity';
import Profile from '../components/profile';
import Settings from '../components/settings';
import OtherUserProfile from '../components/other_user_profile';

const Stack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

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
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="OtherUserProfile" component={OtherUserProfile} />
    </Stack.Navigator>
  );
};

const MainTabBar = () => {
  return (
    <Tab.Navigator initialRouteName="Home"
      activeColor="rgba(255, 255, 255, 1)"
      inactiveColor="rgb(156, 153, 150)"
      shifting
      barStyle={{ backgroundColor: 'tomato' }}
    >
      {/* Eventually, the Home tab will point to either Home or HomeLimited, depending
        on whether the user is logged in. initialRouteName above will need to alternate based on
        authentication status as well. */}
      <Tab.Screen name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: 'rgb(29,24,27)',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen name="Search"
        component={SearchStack}
        options={{
          tabBarLabel: 'Search',
          tabBarColor: 'rgb(59,54,57)',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="search-web" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen name="Explore"
        component={Activity}
        options={{
          tabBarLabel: 'Explore',
          tabBarColor: 'rgb(89,84,87)',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chart-bubble" color={color} size={26} />
          ),
        }}
      />
      {/* <Tab.Screen name="Profile" component={Profile} /> */}
      <Tab.Screen name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: 'rgb(119,114,117)',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabBar;
