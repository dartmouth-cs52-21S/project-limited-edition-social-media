import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Pressable,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AllPosts from './all_posts';

const ModalStack = createStackNavigator();

class HomeLimited extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.navigation = navigation;
  }

  handleSignInPress() {
    this.navigation.replace('SignIn');
  }

  handleSignUpPress() {
    this.navigation.replace('SignUp');
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <View style={styles.homelimited}>
          <ModalStack.Navigator mode="modal">
            <ModalStack.Screen name="Home Limited" component={AllPosts} />
          </ModalStack.Navigator>
        </View> */}
        <View style={styles.signinFunctions}>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#4166b0' : '#5486E8',
              },
              styles.button,
            ]}
            onPress={
          () => {
            this.handleSignInPress();
          }
          }
          >
            <Text style={styles.buttonText}>
              Sign In
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#4166b0' : '#5486E8',
              },
              styles.button,
            ]}
            onPress={
          () => {
            this.handleSignUpPress();
          }
          }
          >
            <Text style={styles.buttonText}>
              Sign Up
            </Text>
          </Pressable>
        </View>
      </View>
    // <View style={styles.container}>
    //   <Text>
    //     Restricted feed for users who have not signed in yet.
    //   </Text>
    //   <Button title="Sign In"
    //     onPress={
    //       () => {
    //         this.handleSignInPress();
    //       }
    //   }
    //   />
    //   <Button title="Sign Up"
    //     onPress={
    //       () => {
    //         this.handleSignUpPress();
    //       }
    //   }
    //   />
    // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  homelimited: {
    flex: 1,

  },
  signinFunctions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 50,
  },
  button: {
    elevation: 40,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginHorizontal: 30,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },

});

export default HomeLimited;
