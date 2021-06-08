/* eslint-disable no-case-declarations */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, Text,
} from 'react-native';
import { Button } from 'react-native-paper';
import { signoutUser } from '../actions';
import AuthButton from './auth_button';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFollowerVisible: true,
      isFollowingVisible: true,
      isBadgeVisible: true,
    };
    this.navigation = this.props.navigation;
    this.profileState = this.props.route.params;
    // state variable for didMount, load when true, loading screen if not
    // conditional render
  }

  componentDidMount() {
    this.setState({
      isFollowerVisible: this.profileState.isFollowerVisible,
      isFollowingVisible: this.profileState.isFollowingVisible,
      isBadgeVisible: this.profileState.isBadgeVisible,
    });
  }

  handleSignOutPress() {
    this.props.signoutUser(this.navigation);
  }

  changeState(paramVisible) {
    switch (paramVisible) {
      case 'isFollowerVisible':
        const follower = this.state.isFollowerVisible;
        this.setState({ isFollowerVisible: !follower });
        break;
      case 'isFollowingVisible':
        const following = this.state.isFollowingVisible;
        this.setState({ isFollowingVisible: !following });
        break;
      case 'isBadgeVisible':
        const badge = this.state.isBadgeVisible;
        this.setState({ isBadgeVisible: !badge });
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.text}>Follower Count</Text>
          <Button style={styles.textBttn}
            onPress={() => {
              this.profileState.followerVisible();
              this.changeState('isFollowerVisible');
            }}
          >
            {this.state.isFollowerVisible ? 'Public' : 'Private'}
          </Button>
        </View>
        <View style={styles.top}>
          <Text style={styles.text}>Following Count</Text>
          <Button style={styles.textBttn}
            onPress={() => {
              this.profileState.followingVisible();
              this.changeState('isFollowingVisible');
            }}
          >
            {this.state.isFollowingVisible ? 'Public' : 'Private'}
          </Button>
        </View>
        <View style={styles.top}>
          <Text style={styles.text}>My Badges</Text>
          <Button style={styles.textBttn}
            onPress={() => {
              this.profileState.badgeVisible();
              this.changeState('isBadgeVisible');
            }}
          >
            {this.state.isBadgeVisible ? 'Public' : 'Private'}
          </Button>
        </View>
        <AuthButton onPress={() => this.handleSignOutPress()}>Sign Out</AuthButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-evenly',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#468189',
  },
  image: {
    width: 400,
    height: 300,
  },
  top: {
    position: 'relative',
    width: '80%',
    top: 0,
    display: 'flex',
    padding: 0,
    margin: 0,
    textDecorationLine: 'underline',
    textDecorationColor: 'gray',
    textDecorationStyle: 'solid',
  },
  text: {
    // fontFamily: 'Open Sans',
    position: 'absolute',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 20,
    top: 10,
    left: 10,
    color: '#FFFBFC',
  },
  bttn: {
    // backgroundColor: '#5486E8',
    color: '#fff',
  },
  textBttn: {
    top: 5,
    right: 0,
    fontStyle: 'italic',
    // fontFamily: 'Open Sans',
    fontSize: 20,
    position: 'absolute',
  },
});

const mapStateToProps = ({ user }) => (
  {
    user,
  }
);

export default connect(mapStateToProps, { signoutUser })(Profile);
