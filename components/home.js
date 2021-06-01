import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AllPosts from './all_posts';

const ModalStack = createStackNavigator();

class Home extends Component {
  render() {
    return (
      <ModalStack.Navigator mode="modal">
        <ModalStack.Screen name="AllPosts" component={AllPosts} />
      </ModalStack.Navigator>
    );
  }
}

export default Home;
