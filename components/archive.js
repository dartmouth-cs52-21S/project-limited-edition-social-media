import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FlatList, View, StyleSheet, Image,
} from 'react-native';
import {
  Modal, Portal, Button, Text,
} from 'react-native-paper';
import {
  getArchives, updateFollow, updateUnfollow, isFollowing, profileUser,
} from '../actions';
import PostMinimized from './post_minimized';

const DEFAULT_IMG = 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png';

class Archive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      currUser: '',
      isFollow: '',
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      console.log(this.props.posts);
      this.props.getArchives();
      this.props.profileUser();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  setVisible = (bool) => this.setState({ visible: bool });

  showModal = ({ author: { username: currUser, displayname: displayName, profilePic } }) => {
    this.setVisible(true);
    this.setState({ currUser, displayName, profilePic });
  }

  hideModal = () => this.setVisible(false);

  follow = () => {
    this.hideModal();
    this.props.updateFollow(this.state.currUser);
  }

  unfollow = () => {
    this.hideModal();
    this.props.updateUnfollow(this.state.currUser);
  }

  routeProfile = () => {
    this.hideModal();
    this.props.navigation.navigate('Profile', { name: 'Profile' });
  }

  handleShowProfilePress = () => {
    this.hideModal();
    this.props.navigation.navigate('OtherUserProfile', {
      name: 'OtherUserProfile',
      username: this.state.currUser,
    });
  }

  renderModal = () => {
    if (!this.state.currUser) {
      return <View><Text>No user found</Text></View>;
    }
    if (this.state.currUser === this.props.user.username) {
      return <Button style={styles.follow} onPress={this.routeProfile}>My Profile</Button>;
    }
    this.props.isFollowing(this.state.currUser).then(({ data }) => {
      if (this.state.isFollow !== data) this.setState({ isFollow: data });
    });
    return this.state.isFollow
      ? <Button style={styles.follow} onPress={this.unfollow}>Unfollow</Button>
      : <Button style={styles.follow} onPress={this.follow}>Follow</Button>;
  }

  renderPostMinimizedItem = ({ item }) => (
    <View>
      <PostMinimized
        caption={item.caption}
        preview={item.preview}
        content={item.content}
        currentViews={item.currentViews}
        viewLimit={item.viewLimit}
        archive={true}
        blur={0}
        tags={item.hashtags}
        type="image"
        author={item.author}
        showModal={this.showModal}
        id={item.id}
      />
    </View>
  );

  render() {
    if (!this.props.posts) {
      return <View />;
    } else if (this.props.posts.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.text}>
            Check out some posts in your home feed and
            press the button in the bottom-left of a post to
            add it here! Your created posts will go here as well! :D
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.postsContainer}>
          <FlatList
            data={this.props.posts}
            renderItem={this.renderPostMinimizedItem}
            keyExtractor={(item) => item._id}
          />
          <Portal>
            <Modal
              visible={this.state.visible}
              onDismiss={this.hideModal}
              contentContainerStyle={styles.containerStyle}
            >
              <Text style={styles.modalText}>{this.state.displayName || '--- bad data ---'}</Text>
              <View style={styles.picView}>
                <Image
                  style={styles.pic}
                  source={{ uri: this.state.profilePic || DEFAULT_IMG }}
                />
                {this.renderModal()}
                {this.state.currUser === this.props.user.username ? <Text /> : <Button style={styles.follow} onPress={this.handleShowProfilePress}>See Profile</Button> }
              </View>
            </Modal>
          </Portal>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  postsContainer: {
    flex: 1,
  },
  containerStyle: {
    backgroundColor: '#fff',
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  follow: {
    zIndex: 99,
    backgroundColor: '#5486E8',
    color: '#fff',
    width: '90%',
    marginBottom: 10,
  },
  modalText: {
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 20,
  },
  pic: {
    width: 200,
    height: 200,
    margin: 20,
  },
  picView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    margin: 20,
    color: 'rgb(0,0,0)',
    textAlign: 'center',
    fontSize: 40,
    paddingBottom: 60,
    fontWeight: '100',
    fontFamily: 'Gill Sans',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
});

const mapStateToProps = (state) => (
  {
    posts: state.user.archivedFeed,
    user: state.user,
  }
);

export default connect(mapStateToProps, {
  getArchives, updateFollow, updateUnfollow, isFollowing, profileUser,
})(Archive);
