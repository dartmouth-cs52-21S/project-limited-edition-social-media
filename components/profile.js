import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, Text, Button, Image,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import { signoutUser, profileUser } from '../actions';
// import Settings from './settings';

class Profile extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.navigation = navigation;
  }

  componentDidMount = () => {
    console.log('did mount');
    this.props.profileUser().then(
      console.log(this.props.user),
    );
  };

  handleSignOutPress() {
    this.props.signoutUser(this.navigation);
  }

  handleSettingsPress = () => {
    console.log('hit settings');
  }

  handleBack = () => {
    console.log('hit back');
  }

  navbar = () => {
    // this.navigation.navigate('Settings', { name: 'Settings' });
    <Appbar style={styles.top}>
      <Appbar.Action
        icon="arrow-left-circle"
        onPress={() => this.handleBack()}
      />
      <Appbar.Action icon="cog" onPress={() => this.handleSettingsPress()} />
    </Appbar>;
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Appbar style={styles.top}>
          <Appbar.Action
            icon="arrow-left-circle"
            onPress={() => this.handleBack()}
          />
          <Appbar.Action icon="cog" onPress={() => this.handleSettingsPress()} />
        </Appbar> */}

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
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const mapStateToProps = ({ user }) => (
  {
    user,
  }
);

export default connect(mapStateToProps, { signoutUser, profileUser })(Profile);
