import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, Text, Image,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { profileUserWithUsername } from '../actions';

class OtherUserProfile extends Component {
  constructor(props) {
    super(props);
    this.username = this.props.route.params.username;
  }

  componentDidMount() {
    this.props.profileUserWithUsername(this.username);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.pic}
          source={{ uri: this.props.user.profilePic || 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg' }}
        />
        <Text style={styles.followNum}>
          {' '}
          {this.username}
          {' '}
        </Text>
        <View style={styles.followContainer}>
          <View style={this.props.user.isFollowerListVisible ? styles.follow : styles.hide}>
            {/* <View style={styles.follow}> */}
            <Text style={styles.followNum}>{this.props.user.followerList.length}</Text>
            <Text style={styles.followWord}>followers</Text>
          </View>
          <View style={this.props.user.isFollowerListVisible && this.props.user.isFollowingListVisible ? styles.follow : styles.hide}>
            {/* <View style={styles.follow}> */}
            {/* Very confused by native styling o_o */}
            <Text style={styles.followNum}>            </Text>
          </View>
          <View style={this.props.user.isFollowingListVisible ? styles.follow : styles.hide}>
            {/* <View style={styles.follow}> */}
            <Text style={styles.followNum}>{this.props.user.followingList.length}</Text>
            <Text style={styles.followWord}>following</Text>
          </View>
        </View>
        <View style={this.props.user.isBadgeListVisible ? styles.badges : styles.hide}>
          {/* <View style={styles.badges}> */}
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

export default connect(mapStateToProps, { profileUserWithUsername })(OtherUserProfile);
