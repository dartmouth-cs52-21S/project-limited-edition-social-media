import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Button,
} from 'react-native';
import { connect } from 'react-redux';
import AuthInput from './auth_input';
import AuthButton from './auth_button';

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

  handleBackPress = () => {
    this.navigation.goBack();
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
    return (
      <View style={styles.container}>
        <View style={styles.authContainer}>
          <Text style={styles.title}>Sign Up</Text>
        </View>

        <View style={styles.authContainer}>
          <AuthInput placeholder="Email" value={this.state.email} onChange={this.onEmailChange} />
          <AuthInput placeholder="Display Name" value={this.state.displayname} onChange={this.onDisplaynameChange} />
          <AuthInput placeholder="Username" value={this.state.username} onChange={this.onUsernameChange} />
          <AuthInput placeholder="Password" value={this.state.password} onChange={this.onPasswordChange} />
        </View>
        <View style={styles.authContainer}>
          <AuthButton text="Sign Up" onPress={() => this.handleSignUpPress()} />
          <AuthButton bottomButton={true} text="Back" onPress={() => { this.handleBackPress(); }} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#2E4057',
  },
  title: {
    fontFamily: 'Gill Sans',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
    marginTop: 100,
  },
  authContainer: {
    width: '100%',
  },
});

export default connect(null, { signupUser })(SignUp);
