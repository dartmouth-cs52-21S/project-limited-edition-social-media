import React, { Component } from 'react';
import {
  StyleSheet, View, Text,
} from 'react-native';
// import { createStackNavigator } from '@react-navigation/stack';
// import AllPosts from './all_posts';
import AuthButton from './auth_button';

// const ModalStack = createStackNavigator();

class HomeLimited extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.navigation = navigation;
  }

  handleSignInPress() {
    this.navigation.navigate('SignIn');
  }

  handleSignUpPress() {
    this.navigation.navigate('SignUp');
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <View style={styles.homelimited}>
          <ModalStack.Navigator mode="modal">
            <ModalStack.Screen name="Home Limited" component={AllPosts} />
          </ModalStack.Navigator>
        </View> */}
        <View style={styles.logoView}>
          <Text style={styles.logoText}>Poof</Text>
        </View>

        <View style={styles.signinFunctions}>
          <AuthButton text="Sign In" onPress={() => this.handleSignInPress()} />
          <AuthButton text="Sign Up" onPress={() => this.handleSignUpPress()} />
          {/* <Pressable
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
          </Pressable> */}
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
    backgroundColor: '#2E4057',
    justifyContent: 'space-around',
    alignContent: 'center',
  },
  homelimited: {
    flex: 1,
  },
  logoView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logoText: {
    color: '#fff',
    fontSize: 60,
    fontFamily: 'Gill Sans',
    fontWeight: 'bold',
  },
  signinFunctions: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: 200,
    width: '100%',
  },

});

export default HomeLimited;
