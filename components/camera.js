// Temporary placeholder component
// you can use the camera by installing expo-camera: https://docs.expo.io/versions/v41.0.0/sdk/camera/
// there are other camera packages out there but this and react-native-camera, which is very similiar to this,
// appear to be the standard. At least from what I could find, might be worth it to ask professor before diving in.
import React, { Component } from 'react';
import {
  StyleSheet, View, Text,
} from 'react-native';
import MenuButton from './menu_button';

class Camera extends Component {
  handleCameraPress = () => {
    this.props.navigation.navigate('New Post');
  }

  handleClose = () => {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Camera Placeholder</Text>
        <MenuButton primaryText="Click Here" centerText onPress={this.handleCameraPress} />
        <MenuButton primaryText="Go Back" centerText onPress={this.handleClose} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 400,
    height: 300,
  },
});

export default Camera;
