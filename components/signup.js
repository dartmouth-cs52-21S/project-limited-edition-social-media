import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Button,
} from 'react-native';
import { connect } from 'react-redux';
import AuthInput from './auth_input';
import { signupUser } from '../actions';

class SignUp extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.navigation = navigation;

    this.state = {
      email: '',
      password: '',
      displayname: '',
      username: '',
    };
  }

  handleSignUpPress() {
    this.props.signupUser(this.state, this.navigation);
    // this.navigation.replace('MainTab');
  }

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
    console.warn(this.state);
    return (
      <View style={styles.container}>
        <Text>
          Sign Up
        </Text>
        <AuthInput placeholder="Email" value={this.state.email} onChange={this.onEmailChange} />
        <AuthInput placeholder="Display Name" value={this.state.displayname} onChange={this.onDisplaynameChange} />
        <AuthInput placeholder="Username" value={this.state.username} onChange={this.onUsernameChange} />
        <AuthInput placeholder="Password" value={this.state.password} onChange={this.onPasswordChange} />
        <Button title="Sign Up" onPress={() => this.handleSignUpPress()} />
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
