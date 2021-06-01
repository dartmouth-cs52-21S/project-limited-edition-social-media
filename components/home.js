import React, { Component } from 'react';
import {
  FlatList, View, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import {
  Modal, Portal, Button, Text,
} from 'react-native-paper';
import {
  fetchPosts, updateFollow, updateUnfollow, isFollowing,
} from '../actions';
import PostMinimized from './post_minimized';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      currUser: '',
      isFollow: '',
    };
  }

  componentDidMount() {
    this._fetchPostsCleanup = this.props.navigation.addListener('focus', () => this.props.fetchPosts());
  }

  componentWillUnmount() {
    this._fetchPostsCleanup();
  }

  setVisible = (bool) => this.setState({ visible: bool });

  showModal = ({ username: currUser, displayName }) => {
    this.setVisible(true);
    this.setState({ currUser, displayName });
  }

  hideModal = () => this.setVisible(false);

  follow = () => this.props.updateFollow(this.state.currUser);

  unfollow = () => this.props.updateUnfollow(this.state.currUser);

  renderPostMinimizedItem = ({ item }) => (
    <PostMinimized
      caption={item.caption}
      content={item.preview}
      displayName={item.author.displayname}
      username={item.author.username}
      currentViews={item.currentViews}
      viewLimit={item.viewLimit}
      showModal={this.showModal}
    />
  );

  renderModal = () => {
    if (!this.state.currUser) {
      return <View><Text>No user found</Text></View>;
    }
    this.props.isFollowing(this.state.currUser).then(({ data }) => {
      if (this.state.isFollow !== data) this.setState({ isFollow: data });
    });
    return this.state.isFollow
      ? <Button style={styles.follow} onPress={() => this.unfollow()}>Unfollow</Button>
      : <Button style={styles.follow} onPress={this.follow}>Follow</Button>;
  }

  render() {
    return (
      <View style={styles.postsContainer}>
        <FlatList
          data={this.props.posts}
          renderItem={this.renderPostMinimizedItem}
          keyExtractor={(item) => item._id}
        />
        <Portal>
          <Modal visible={this.state.visible} onDismiss={this.hideModal} contentContainerStyle={styles.containerStyle}>
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
  }
);

export default connect(mapStateToProps, {
  fetchPosts, updateFollow, updateUnfollow, isFollowing,
})(Home);
