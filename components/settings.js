import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View,
} from 'react-native';
import { Appbar, Button } from 'react-native-paper';

class Profile extends Component {
  navbar = () => (
    <Appbar style={styles.top}>
      <Appbar.Action
        icon="arrow-left-circle"
        onPress={() => this.handleBack()}
      />
    </Appbar>
  );

  render() {
    return (
      <View style={styles.container}>
        {this.navbar()}

        <Button title="Sign Out" onPress={() => console.log('hello')} />
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
