import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, Text,
} from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { signoutUser, profileUser } from '../actions';

class Profile extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.navigation = navigation;
  }

  componentDidMount = () => {
    this.props.profileUser();
  };

  handleSignOutPress() {
    this.props.signoutUser(this.navigation);
  }

  navbar = () => (
    <Appbar style={styles.bottom}>
      <Appbar.Action
        icon="archive"
        onPress={() => console.log('Pressed archive')}
      />
      <Appbar.Action icon="mail" onPress={() => console.log('Pressed mail')} />
      <Appbar.Action icon="label" onPress={() => console.log('Pressed label')} />
      <Appbar.Action
        icon="delete"
        onPress={() => console.log('Pressed delete')}
      />
    </Appbar>
  );

  render() {
    return (
      <View style={styles.container}>
        {/* {this.navbar()} */}
        <Text>
          {this.props.user.displayname}
          {this.props.user.followerList.length}
          {this.props.user.followingList.length}
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
});

const mapStateToProps = ({ user }) => (
  {
    user,
  }
);

export default connect(mapStateToProps, { signoutUser, profileUser })(Profile);
