import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, Text, Image,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { profileUser } from '../actions';

class Profile extends Component {
  componentDidMount = () => {
    this.props.profileUser();
  };

  handleSettingsPress = () => {
    this.props.navigation.navigate('Settings', { name: 'Settings' });
  }

  render() {
    return (
      <View style={styles.container}>
        <Appbar style={styles.top}>
          {/* Temporary until I find the appropriate React lifecycle fuction */}
          <Appbar.Action icon="refresh" onPress={() => this.props.profileUser()} />
          <Text style={styles.center}>Profile</Text>
          <Appbar.Action icon="cog" onPress={() => this.handleSettingsPress()} />
        </Appbar>
        <Image
          style={styles.pic}
          source={{ uri: this.props.user.profilePic || 'https://i.pinimg.com/236x/02/6a/cc/026acca08fb7beea6bd4ecd430e312bd.jpg' }}
        />
        <Text style={styles.followNum}>
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
            {/* Very confused by native styling o_o */}
            <Text style={styles.followNum}>            </Text>
          </View>
          <View style={styles.follow}>
            <Text style={styles.followNum}>{this.props.user.followingList.length}</Text>
            <Text style={styles.followWord}>following</Text>
          </View>
        </View>
        <View style={styles.badges}>
          <Text style={styles.badgeWord}>My Badges:</Text>
        </View>
      </View>
    );
  }
}

const statusBarHeight = getStatusBarHeight();

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
    top: statusBarHeight,
  },
  top: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: statusBarHeight,
    display: 'flex',
    justifyContent: 'space-between',
  },
  right: {
    right: 0,
    position: 'absolute',
  },
  center: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  followContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginRight: 20,
    // paddingRight: 20,
  },
  followNum: {
    fontWeight: '800',
    textAlign: 'center',
    fontSize: 20,
  },
  badgeWord: {
    fontWeight: '600',
    // textAlign: 'left',
    fontSize: 20,
    // display: 'flex',
    // justifyContent: 'flex-start',
    // right: 0,
    // position: 'absolute',
  },
});

const mapStateToProps = ({ user }) => (
  {
    user,
  }
);

export default connect(mapStateToProps, { profileUser })(Profile);
