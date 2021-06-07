// This file adapted from example at https://reactnative.dev/docs/textinput
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const AuthInput = (props) => {
  return (
    <TextInput
      style={styles.input}
      onChangeText={(value) => props.onChange(value)}
      value={props.value}
      placeholder={props.placeholder}
      placeholderTextColor="#468189"
      returnKeyType={props.returnKeyType}
      textContentType={props.textContentType}
      secureTextEntry={props.secureTextEntry}
      keyboardType={props.keyboardType}
      autoCompleteType={props.autoCompleteType}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 16,
    width: '80%',
    // borderWidth: 1,
    borderBottomWidth: 3,
    borderColor: '#468189',
    color: '#FFFBFC',
    alignSelf: 'center',
    fontSize: 18,
  },
});

export default AuthInput;
