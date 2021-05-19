import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Button,
} from 'react-native';

class HomeLimited extends Component {
  handleSignInPress() {
    // navigation.navigate('SignIn');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Restricted feed for users who have not signed in yet.
        </Text>
        <Button title="Sign In" onPress={this.handleSignInPress} />
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

export default HomeLimited;
