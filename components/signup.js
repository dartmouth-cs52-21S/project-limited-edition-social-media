import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Button,
} from 'react-native';
import { connect } from 'react-redux';
import AuthInput from './auth_input';
import { signupUser } from '../actions/index';

class SignUp extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.navigation = navigation;

    this.state = {
      email: '',
      password: '',
      username: '',
      author: '',
    };
  }

  handleSignUpPress() {
    this.navigation.replace('MainTab');
  }

  onEmailChange = (change) => {
    this.setState({ email: change });
  }

  onPasswordChange = (change) => {
    this.setState({ password: change });
  }

  onAuthorChange = (change) => {
    this.setState({ author: change });
  }

  onUsernameChange = (change) => {
    this.setState({ username: change });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Sign Up
        </Text>
        <AuthInput placeholder="Email" value={this.state.email} onChange={(change) => this.onEmailChange(change)} />
        <AuthInput placeholder="Display Name" value={this.state.author} onChange={(change) => this.onAuthorChange(change)} />
        <AuthInput placeholder="Username" value={this.state.username} onChange={(change) => this.onUsernameChange(change)} />
        <AuthInput placeholder="Password" value={this.state.password} onChange={(change) => this.onPasswordChange(change)} />
        <Button title="Sign Up - Not Functional"
          onPress={
            () => { this.handleSignUpPress(); }
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

export default SignUp;
