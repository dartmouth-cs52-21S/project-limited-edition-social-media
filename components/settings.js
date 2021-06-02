import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, Text,
} from 'react-native';
import { Button } from 'react-native-paper';
import { signoutUser } from '../actions';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    // state variable for didMount, load when true, loading screen if not
    // conditional render
  }

  handleSignOutPress() {
    this.props.signoutUser(this.navigation);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> Settings... just a humble button for now </Text>
        <Button style={styles.bttn} onPress={() => this.handleSignOutPress()}>Sign Out</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
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
  bttn: {
    backgroundColor: '#5486E8',
    color: '#fff',
  },
});

const mapStateToProps = ({ user }) => (
  {
    user,
  }
);

export default connect(mapStateToProps, { signoutUser })(Profile);
