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
    this.props.profileUser();
  };

  handleSignOutPress() {
    this.props.signoutUser(this.navigation);
  }

  handleSettingsPress = () => {
    this.props.navigation.navigate('Settings', { name: 'Settings' });
  }

  render() {
    return (
      <View style={styles.container}>
        <Appbar style={styles.top}>
          <Appbar.Action icon="cog" style={styles.right} onPress={() => this.handleSettingsPress()} />
          {/* Temporary until I find the appropriate React lifecycle fuction */}
          <Appbar.Action icon="refresh" onPress={() => this.props.profileUser()} />
        </Appbar>
        <Image
          style={styles.pic}
          // source={{ uri: 'https://i.pinimg.com/236x/02/6a/cc/026acca08fb7beea6bd4ecd430e312bd.jpg' }}
          source={{ uri: this.props.user.profilePic }}
        />
        <Text style={styles.name}>
          {' '}
          {this.props.user.displayname}
          {' '}
        </Text>
        <View style={styles.followContainer}>
          <View style={styles.follow}>
            <Text style={styles.followNum}>{this.props.user.followerList.length}</Text>
            <Text style={styles.followWord}>followers</Text>
          </View>
          <View style={styles.follow}>
            <Text style={styles.followNum}>{this.props.user.followingList.length}</Text>
            <Text style={styles.followWord}>following</Text>
          </View>
        </View>
        <View style={styles.badges}>
          <Text style={styles.badgeWord}>My Badges:</Text>
        </View>
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
    backgroundColor: '#fff',
  },
  image: {
    width: 400,
    height: 300,
  },
  pic: {
    width: 200,
    height: 200,
    borderRadius: 49,
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
  followContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  followNum: {
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 20,
  },

});

const mapStateToProps = ({ user }) => (
  {
    user,
  }
);

export default connect(mapStateToProps, { signoutUser, profileUser })(Profile);
