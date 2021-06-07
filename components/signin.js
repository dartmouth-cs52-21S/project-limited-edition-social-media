import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, Text,
} from 'react-native';
import AuthInput from './auth_input';
import AuthButton from './auth_button';
import { signinUser, clearAuthError } from '../actions';

class SignIn extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.navigation = navigation;

    this.state = {
      email: '',
      password: '',
      error: '',
    };
  }

  // TODO: Tell user if invalid username/password.
  handleSignInPress = () => {
    if (!this.state.email) {
      this.setState({ error: 'Please enter an email.' });
    } else if (!this.state.password) {
      this.setState({ error: 'Please enter a password.' });
    } else {
      this.setState({ error: '' });
      const user = {
        email: this.state.email,
        password: this.state.password,
      };
      this.props.signinUser(user, this.navigation);
      console.log(this.props.signInError);
    }
  }

  handleBackPress = () => {
    this.props.clearAuthError();
    this.navigation.goBack();
  }

  onEmailChange = (change) => {
    this.setState({ email: change });
  }

  onPasswordChange = (change) => {
    this.setState({ password: change });
  }

  renderServerError = () => {
    if (this.props.signInError) {
      console.log('server error caught');
      this.setState({ error: this.props.signInError });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.authContainer}>
          <Text style={styles.title}>Sign In</Text>
        </View>

        <View style={styles.authContainer}>
          <AuthInput textContentType="emailAddress" placeholder="Email" value={this.state.email} onChange={this.onEmailChange} />
          <AuthInput textContentType="password" secureTextEntry={true} placeholder="Password" value={this.state.password} onChange={this.onPasswordChange} />
        </View>
        <View style={styles.authContainer}>
          <Text style={styles.errorText}>{this.state.error}</Text>
        </View>
        <View style={styles.authContainer}>
          <AuthButton text="Sign In" onPress={() => { this.handleSignInPress(); }} />
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
    signInError: state.auth.error,
  }
);

export default connect(mapStateToProps, { signinUser, clearAuthError })(SignIn);
