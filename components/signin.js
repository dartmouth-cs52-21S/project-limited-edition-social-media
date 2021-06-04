import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, Text,
} from 'react-native';
import { Button } from 'react-native-elements';
import AuthInput from './auth_input';
import { signinUser, clearAuthError } from '../actions';

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

  componentDidMount() {
    this._setErrorCleanup = this.props.navigation.addListener('focus', () => this.props.clearAuthError());
  }

  componentWillUnmount() {
    this._setErrorCleanup();
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

  renderError = () => {
    if (this.props.signInError) {
      return (
        <Text style={styles.error}>
          {this.props.signInError}
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
        <AuthInput placeholder="Email" value={this.state.email} onChange={this.onEmailChange} />
        <AuthInput placeholder="Password" value={this.state.password} onChange={this.onPasswordChange} />
        <Button
          title="Sign In"
          onPress={this.handleSignInPress}
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          titleStyle={styles.buttonText}
        />
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
  errorContainer: {
    margin: 12,
    height: '2%',
  },
  button: {
    backgroundColor: '#9e28ed',
  },
  buttonContainer: {
    margin: 12,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Gill Sans',
  },
  error: {
    color: '#f52c4e', // red
    textAlign: 'center',
  },
  image: {
    width: 400,
    height: 300,
  },
});

const mapStateToProps = (state) => (
  {
    signInError: state.auth.error,
  }
);

export default connect(mapStateToProps, { signinUser, clearAuthError })(SignIn);
