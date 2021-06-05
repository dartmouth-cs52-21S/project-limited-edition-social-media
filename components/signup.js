import React, { Component } from 'react';
import {
  StyleSheet, View, Text, KeyboardAvoidingView,
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import AuthInput from './auth_input';
import { signupUser, clearAuthError } from '../actions';

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

  componentDidMount() {
    this._setErrorCleanup = this.props.navigation.addListener('focus', () => this.props.clearAuthError());
  }

  componentWillUnmount() {
    this._setErrorCleanup();
  }

  handleSignUpPress() {
    this.props.signupUser(this.state, this.navigation);
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

  renderError = () => {
    console.log(this.props.signUpError);
    if (this.props.signUpError) {
      return (
        <Text style={styles.error}>
          {this.props.signUpError}
        </Text>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          {this.renderError()}
        </View>
        <KeyboardAvoidingView style={styles.authInputWrapper}>
          <AuthInput placeholder="Email" value={this.state.email} onChange={this.onEmailChange} />
          <AuthInput placeholder="Display Name" value={this.state.displayname} onChange={this.onDisplaynameChange} />
          <AuthInput placeholder="Username" value={this.state.username} onChange={this.onUsernameChange} />
          <AuthInput placeholder="Password" value={this.state.password} onChange={this.onPasswordChange} />
          <Button
            title="Sign Up"
            onPress={() => this.handleSignUpPress()}
            buttonStyle={styles.button}
            containerStyle={styles.buttonContainer}
            titleStyle={styles.buttonText}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: 400,
    height: 300,
  },
  button: {
    backgroundColor: '#ed2860',
  },
  buttonContainer: {
    margin: 12,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Gill Sans',
  },
  errorContainer: {
    margin: 12,
    minHeight: 30,
  },
  error: {
    color: '#f52c4e', // red
    textAlign: 'center',
  },
  authInputWrapper: {
    margin: 0,
    padding: 0,
    width: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',

  },
});

const mapStateToProps = (state) => (
  {
    signUpError: state.auth.error,
  }
);

export default connect(mapStateToProps, { signupUser, clearAuthError })(SignUp);
