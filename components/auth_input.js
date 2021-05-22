// This file adapted from example at https://reactnative.dev/docs/textinput
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const AuthInput = (props) => {
//   const { _props } = props;

  return (
    <TextInput
      style={styles.input}
      onChangeText={() => props.onChange()}
      value={props.value}
      placeholder={props.placeholder}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    width: '80%',
    borderWidth: 1,
  },
});

export default AuthInput;
