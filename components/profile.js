import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, Text, Image,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { profileUser } from '../actions';

const DEFAULT_IMG = 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png';

class Profile extends Component {
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.props.profileUser();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  handleSettingsPress = () => {
    this.props.navigation.navigate('Settings', {
      name: 'Settings',
      isFollowerListVisible: this.props.user.isFollowerListVisible,
      isFollowingListVisible: this.props.user.isFollowingListVisible,
      isBadgeListVisible: this.props.user.isBadgeListVisible,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Appbar style={styles.top}>
          <Text style={styles.center}>Profile</Text>
          <Appbar.Action icon="cog" onPress={() => this.handleSettingsPress()} />
        </Appbar>
        <Image
          style={styles.pic}
          source={{ uri: this.props.user.profilePic || DEFAULT_IMG }}
        />
        <Text style={styles.followNum}>
          {' '}
          {this.props.user.displayname}
          {' '}
        </Text>
        <View style={styles.followContainer}>
          <View style={this.props.user.isFollowerListVisible ? styles.follow : styles.hide}>
            {/* <View style={this.state.isFollowerVisible ? styles.follow : styles.hide}> */}
            <Text style={styles.followNum}>{this.props.user.followerList.length}</Text>
            <Text style={styles.followWord}>followers</Text>
          </View>
          {/* <View style={this.state.isFollowerVisible && this.state.isFollowingVisible ? styles.follow : styles.hide}></View> */}
          <View style={this.props.user.isFollowerListVisible && this.props.user.isFollowingListVisible ? styles.follow : styles.hide}>
            {/* Very confused by native styling o_o */}
            <Text style={styles.followNum}>            </Text>
          </View>
          <View style={this.props.user.isFollowingListVisible ? styles.follow : styles.hide}>
            {/* <View style={this.state.isFollowingVisible ? styles.follow : styles.hide}> */}
            <Text style={styles.followNum}>{this.props.user.followingList.length}</Text>
            <Text style={styles.followWord}>following</Text>
          </View>
        </View>
        {/* <View style={this.state.isBadgeVisible ? styles.badges : styles.hide}> */}
        <View style={this.props.user.isBadgeListVisible ? styles.badges : styles.hide}>
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
    top: statusBarHeight + 30,
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
    fontSize: 20,
  },
  hide: {
    display: 'none',
  },
});

const mapStateToProps = ({ user }) => (
  {
    user,
  }
);

export default connect(mapStateToProps, { profileUser })(Profile);
