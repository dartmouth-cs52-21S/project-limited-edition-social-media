import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeLimited from '../components/home_limited';
import SignIn from '../components/signin';
import SignUp from '../components/signup';

const Stack = createStackNavigator();

// nest stack navigator to handle two internal views
// "name" prop is the name of the route
const HomeLimitedTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeLimited"
        component={HomeLimited}
        // options={{
        //   title: 'Limited Access',
        //   headerStyle: {
        //     backgroundColor: '#f4511e',
        //   },
        //   headerTintColor: '#fff',
        // }}
      />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default HomeLimitedTab;
