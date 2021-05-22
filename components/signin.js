import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Button,
} from 'react-native';

class SignIn extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.navigation = navigation;
  }

  handleSignInPress() {
    this.navigation.replace('MainTab');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Sign In
        </Text>
        <Button title="Sign In"
          onPress={() => { this.handleSignInPress(); }}
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

export default SignIn;
