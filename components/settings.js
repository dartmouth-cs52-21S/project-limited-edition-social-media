/* eslint-disable no-case-declarations */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, Text,
} from 'react-native';
import { Button } from 'react-native-paper';
import { signoutUser, updateProfileFieldVisibility } from '../actions';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.profileState = this.props.route.params;
    this.state = {
      isFollowerListVisible: this.profileState.isFollowerListVisible,
      isFollowingListVisible: this.profileState.isFollowingListVisible,
    };
  }

  handleSignOutPress() {
    this.props.signoutUser(this.navigation);
  }

  handleOptionUpdate(field) {
    this.props.updateProfileFieldVisibility(field).then(({ data: currState }) => this.setState(currState));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.text}>Follower Count</Text>
          <Button style={styles.textBttn}
            onPress={() => this.handleOptionUpdate('isFollowerListVisible')}
          >
            {this.state.isFollowerListVisible ? 'Public' : 'Private'}
          </Button>
        </View>
        <View style={styles.top}>
          <Text style={styles.text}>Following Count</Text>
          <Button style={styles.textBttn}
            onPress={() => this.handleOptionUpdate('isFollowingListVisible')}
          >
            {this.state.isFollowingListVisible ? 'Public' : 'Private'}
          </Button>
        </View>
        <Button style={styles.bttn} onPress={() => this.handleSignOutPress()}>Sign Out</Button>
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
    backgroundColor: '#fff',
  },
  image: {
    width: 400,
    height: 300,
  },
  top: {
    position: 'relative',
    width: '100%',
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

export default connect(mapStateToProps, { signoutUser, updateProfileFieldVisibility })(Profile);
