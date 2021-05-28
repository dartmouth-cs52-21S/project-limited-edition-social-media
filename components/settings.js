import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, Text,
} from 'react-native';

class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Settings </Text>
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
  top: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const mapStateToProps = ({ user }) => (
  {
    user,
  }
);

export default connect(mapStateToProps, null)(Profile);
