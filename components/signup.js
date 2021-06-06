import React, { Component } from 'react';
import {
  StyleSheet, View, Text,
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
      error: '',
    };
  }

  // TODO: Check for email in use, username in use.
  handleSignUpPress() {
    if (!this.state.displayname) {
      this.setState({ error: 'Please enter a display name.' });
    } else if (!this.state.username) {
      this.setState({ error: 'Please enter a valid username.' });
    } else if (this.usernameIsTaken()) {
      this.setState({ error: 'Username unavailable.' });
    } else if (!this.state.email || !this.validateEmail()) {
      this.setState({ error: 'Please enter a valid email.' });
    } else if (!this.state.password) {
      this.setState({ error: 'Please enter a valid password.' });
    } else if (this.state.password.length < 8) {
      this.setState({ error: 'Password must be 8 characters.' });
    } else if (this.validatePassword() !== true) {
      this.setState({ error: this.validatePassword() });
    } else {
      this.setState({ error: '' });
      const user = {
        email: this.state.email,
        password: this.state.password,
        displayname: this.state.displayname,
        username: this.state.username,
      };
      this.props.signupUser(user, this.navigation);
    }
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

  // See link for source. All credit goes to w3resource.
  // https://www.w3resource.com/javascript/form/email-validation.php
  validateEmail = () => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email)) {
      return (true);
    }
    return (false);
  }

  // See link for source. All credit goes to O'Reilly.
  // https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s19.html
  validatePassword() {
    const upper = /[A-Z]/;
    const lower = /[a-z]/;
    const number = /[0-9]/;
    const special = /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;

    if (!upper.test(this.state.password)) {
      return 'Password must contain at least 1 uppercase letter.';
    } else if (!lower.test(this.state.password)) {
      return 'Password must contain at least 1 lowercase letter.';
    } else if (!number.test(this.state.password)) {
      return 'Password must contain at least 1 number.';
    } else if (!special.test(this.state.password)) {
      return 'Password must contain at least 1 special character.';
    } else {
      return true;
    }
  }

  // TODO: Test if a username has been taken somehow.
  usernameIsTaken() {
    return this.props.signUpError;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.authContainer}>
          <Text style={styles.title}>Sign Up</Text>
        </View>

        <View style={styles.authContainer}>
          <AuthInput textContentType="givenName" returnKeyType="next" placeholder="Display Name" value={this.state.displayname} onChange={this.onDisplaynameChange} />
          <AuthInput returnKeyType="next" placeholder="Username" value={this.state.username} onChange={this.onUsernameChange} />
          <AuthInput keyboardType="email-address" textContentType="emailAddress" returnKeyType="next" placeholder="Email" value={this.state.email} onChange={this.onEmailChange} />
          <AuthInput textContentType="newPassword" secureTextEntry={true} returnKeyType="done" placeholder="Password" value={this.state.password} onChange={this.onPasswordChange} />
        </View>
        <View style={styles.authContainer}>
          <Text style={styles.errorText}>{this.state.error}</Text>
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
  errorText: {
    color: '#fff',
    textAlign: 'center',
    alignSelf: 'center',
    height: 44,
    fontSize: 18,
    width: '80%',
  },
  authContainer: {
    width: '100%',
  },
});

const mapStateToProps = (state) => (
  {
    signUpError: state.auth.error,
  }
);

export default connect(mapStateToProps, { signupUser })(SignUp);
