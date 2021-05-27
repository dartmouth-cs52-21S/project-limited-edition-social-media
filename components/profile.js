import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, Text, Button,
} from 'react-native';

import { signoutUser, profileUser } from '../actions';

class Profile extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.navigation = navigation;
  }

  handleSignOutPress() {
    this.props.signoutUser(this.navigation);
  }

  async handleViewProfile() {
    this.props.profileUser();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          My Profile
        </Text>
        <Button title="Sign Out" onPress={() => this.handleSignOutPress()} />
        <Button title="Profile" onPress={() => this.handleViewProfile()} />
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

const mapStateToProps = ({ auth }) => (
  {
    auth,
  }
);

export default connect(mapStateToProps, { signoutUser, profileUser })(Profile);
