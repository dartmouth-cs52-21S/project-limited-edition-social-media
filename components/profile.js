import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Button,
} from 'react-native';

class Profile extends Component {
  handleSignOutPress() {
    this.props.navigation.replace('HomeLimited');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          My Profile
        </Text>
        <Button title="Sign Out"
          onPress={
            () => {
              this.handleSignOutPress();
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

export default Profile;
