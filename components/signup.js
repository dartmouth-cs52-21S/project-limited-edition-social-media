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
      displayname: '',
    };
  }

  validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  handleSignUpPress = () => {
    // if (this.validateEmail(this.state.email)) {
    // console.log('email valid');
    let valid = true;
    try {
      console.log('trying singup');
      this.props.signupUser(this.state);
      console.log('attempted signup');
    } catch (error) {
      valid = false;
      console.log(error);
    }

    if (valid) {
      this.navigation.replace('MainTab');
    }
  }
  // }

  onEmailChange = (change) => {
    this.setState({ email: change });
  }

  onPasswordChange = (change) => {
    this.setState({ password: change });
  }

  onDisplaynameChange = (change) => {
    this.setState({ displayname: change });
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
        <AuthInput placeholder="Display Name" value={this.state.displayname} onChange={(change) => this.onDisplaynameChange(change)} />
        <AuthInput placeholder="Username" value={this.state.username} onChange={(change) => this.onUsernameChange(change)} />
        <AuthInput placeholder="Password" value={this.state.password} onChange={(change) => this.onPasswordChange(change)} />
        <Button title="Sign Up" onPress={() => { this.handleSignUpPress(); }} />
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

export default connect(null, { signupUser })(SignUp);
