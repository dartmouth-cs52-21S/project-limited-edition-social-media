import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Button,
} from 'react-native';

class SignUp extends Component {
  handleSignUpPress() {
    this.props.navigation.replace('MainTab');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Sign Up
        </Text>
        <Button title="Sign Up"
          onPress={
            () => {this.handleSignUpPress();}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: 400,
    height: 300,
  },
});

export default SignUp;
