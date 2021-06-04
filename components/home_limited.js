import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Pressable,
} from 'react-native';

class HomeLimited extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.navigation = navigation;
  }

  handleSignInPress = () => {
    this.navigation.navigate('SignIn');
  }

  handleSignUpPress = () => {
    this.navigation.navigate('SignUp');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.signinFunctions}>
          <Pressable
            style={{ ...styles.button, ...styles.signInButton }}
            onPress={this.handleSignInPress}
          >
            <Text style={styles.buttonText}>
              Sign In
            </Text>
          </Pressable>
          <Pressable
            style={{ ...styles.button, ...styles.signUpButton }}
            onPress={this.handleSignUpPress}
          >
            <Text style={styles.buttonText}>
              Sign Up
            </Text>
          </Pressable>
        </View>
      </View>
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
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 100,
    width: '100%',
  },
  button: {
    elevation: 40,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginHorizontal: 30,
    backgroundColor: 'red',
  },
  signInButton: {
    backgroundColor: '#9e28ed',
  },
  signUpButton: {
    backgroundColor: '#ed2860',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    alignSelf: 'center',
    textTransform: 'uppercase',
    fontFamily: 'Gill Sans',
  },

});

export default HomeLimited;
