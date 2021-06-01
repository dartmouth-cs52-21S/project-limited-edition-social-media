import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, Text, Button, Image,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import { signoutUser, profileUser } from '../actions';

class Profile extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.navigation = navigation;
    // state variable for didMount, load when true, loading screen if not
    // conditional render
  }

  componentDidMount = () => {
    this.props.profileUser().then(
      console.log(this.props.user),
    );
  };

  handleSignOutPress() {
    this.props.signoutUser(this.navigation);
  }

  handleSettingsPress = () => {
    this.props.navigation.navigate('Settings', { name: 'Settings' });
  }

  navbar = () => {
    return (
      <Appbar style={styles.top}>
        <Appbar.Action icon="cog" style={styles.right} onPress={() => this.handleSettingsPress()} />
      </Appbar>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.navbar()}

        <Text>
          {this.props.user.displayname}
          <Image
            // style={styles.pic}
            source={{ url: this.props.user.profilePic }}
          />
          Followers:
          {' '}
          {this.props.user.followerList.length}
          Following:
          {' '}
          {this.props.user.followingList.length}
          Badges:
          {this.props.user.badges?.length}
          My Profile
        </Text>
        <Button title="Sign Out" onPress={() => this.handleSignOutPress()} />
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
  },
  right: {
    right: 0,
    position: 'absolute',
  },
});

const mapStateToProps = ({ user }) => (
  {
    user,
  }
);

export default connect(mapStateToProps, { signoutUser, profileUser })(Profile);
