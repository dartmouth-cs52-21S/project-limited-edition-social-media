import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FlatList, View, StyleSheet,
} from 'react-native';
import {
  Modal, Portal, Button, Text,
} from 'react-native-paper';
import {
  fetchPosts, updateFollow, updateUnfollow, isFollowing, profileUser,
} from '../actions';
import PostMinimized from './post_minimized';

class AllPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      currUser: '',
      isFollow: '',
      isRefreshing: false,
    };
  }

  componentDidMount() {
    this._fetchPostsCleanup = this.props.navigation.addListener('focus', () => this.props.fetchPosts());
    this.props.profileUser();
  }

  componentWillUnmount() {
    this._fetchPostsCleanup();
  }

  setIsRefreshing = (value) => {
    this.setState((prevState) => {
      return { ...prevState, isRefreshing: value };
    });
  }

  fetchPostsOnRefreshAsyncWrapper = async () => {
    await this.props.fetchPosts();
    this.setIsRefreshing(false);
  };

  handlePullDownRefresh = () => {
    this.setIsRefreshing(true);
    this.fetchPostsOnRefreshAsyncWrapper();
  };

  setVisible = (bool) => this.setState({ visible: bool });

  showModal = ({ author: { username: currUser, displayname: displayName } }) => {
    this.setVisible(true);
    this.setState({ currUser, displayName });
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
        blur={item.coverBlur}
        tags={item.hashtags}
        type={item.type}
        author={item.author}
        showModal={this.showModal}
        id={item.id}
      />
    </View>
  );

  render() {
    return (
      <View style={styles.postsContainer}>
        <FlatList
          data={this.props.posts}
          renderItem={this.renderPostMinimizedItem}
          keyExtractor={(item) => item._id}
          onRefresh={this.handlePullDownRefresh}
          refreshing={this.state.isRefreshing}
        />
        <Portal>
          <Modal
            visible={this.state.visible}
            onDismiss={this.hideModal}
            contentContainerStyle={styles.containerStyle}
          >
            <Text style={styles.modalText}>{this.state.displayName || '--- bad data ---'}</Text>
            {this.renderModal()}
          </Modal>
        </Portal>
      </View>
    );
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
  follow: {
    zIndex: 99,
    backgroundColor: '#5486E8',
    color: '#fff',
  },
  modalText: {
    textAlign: 'center',
  },
});

const mapStateToProps = (state) => (
  {
    posts: state.posts.all,
    user: state.user,
  }
);

export default connect(mapStateToProps, {
  fetchPosts, updateFollow, updateUnfollow, isFollowing, profileUser,
})(AllPosts);
