import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Button,
} from 'react-native';

class HomeLimited extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.navigation = navigation;
  }

  handleSignInPress() {
    this.props.navigation.replace('SignIn');
  }

  handleSignUpPress() {
    this.props.navigation.replace('SignUp');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Restricted feed for users who have not signed in yet.
        </Text>
        <Button title="Sign In"
          onPress={
            () => {
              this.handleSignInPress();
            }
        }
        />
        <Button title="Sign Up"
          onPress={
            () => {
              this.handleSignUpPress();
            }
        }
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

export default HomeLimited;
