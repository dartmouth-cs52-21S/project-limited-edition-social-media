import React from 'react';
import {
  View, TouchableOpacity, Text, StyleSheet,
} from 'react-native';
import { Icon } from 'react-native-elements';

// this is a custom button used in the 'camera.js' component
// (may delete this when turning in final project) listing props for reference
// this.props.iconName
// this.props.iconType
// this.props.iconText
// this.props.handlePress
const CameraButton = (props) => {
  return (
    <View style={[styles.buttonContainer, props.extraStyles]}>
      <TouchableOpacity onPress={props.handlePress} disabled={props.disabled}>
        <Icon
          name={props.iconName}
          type={props.iconType}
          color="#468189"
          backgroundColor="rgb(255, 255, 255)"
          size={40}
          containerStyle={{ borderRadius: 15 }}
        />
        <Text style={styles.text}>{props.iconText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'rgb(255, 255, 255)',
    textAlign: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    opacity: 0.7,
  },
});

export default CameraButton;
