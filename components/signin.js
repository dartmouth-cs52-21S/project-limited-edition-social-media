import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, Text, Button,
} from 'react-native';
// import { connect } from 'react-redux';
import AuthInput from './auth_input';
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

  onEmailChange = (change) => {
    this.setState({ email: change });
  }

  onPasswordChange = (change) => {
    this.setState({ password: change });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Sign In
        </Text>
        <AuthInput placeholder="Email" value={this.state.email} onChange={this.onEmailChange} />
        <AuthInput placeholder="Password" value={this.state.password} onChange={this.onPasswordChange} />
        <Button title="Sign In"
          onPress={
            () => {
              this.handleSignInPress();
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

export default connect(null, { signinUser })(SignIn);
