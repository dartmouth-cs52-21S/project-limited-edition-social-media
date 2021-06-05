import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, Text, Button,
} from 'react-native';
// import { connect } from 'react-redux';
import AuthInput from './auth_input';
import AuthButton from './auth_button';
import { signinUser } from '../actions';
// import { signupUser } from '../actions/index';

class SignIn extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.navigation = navigation;

    this.state = {
      email: '',
      password: '',
    };
  }

  handleSignInPress = () => {
    this.props.signinUser(this.state, this.navigation);
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
  authContainer: {
    width: '100%',
  },
});

export default connect(null, { signinUser })(SignIn);
