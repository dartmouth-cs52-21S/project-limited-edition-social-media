import React, { Component } from 'react';
import {
  FlatList, View, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import {
  Modal, Portal, Button, Provider, Text,
} from 'react-native-paper';
import { fetchPosts } from '../actions';
import PostMinimized from './post_minimized';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  componentDidMount() {
    this._fetchPostsCleanup = this.props.navigation.addListener('focus', () => {
      this.props.fetchPosts();
    });
  }

  componentWillUnmount() {
    this._fetchPostsCleanup();
  }

  setVisible = () => {
    const currVisibility = this.state.visible;
    this.setState({ visible: !currVisibility });
  }

  showModal = () => {
    console.log('show modal');
    this.setVisible(true);
  }

  hideModal = () => {
    console.log('hide modal');
    this.setVisible(false);
  }

  render() {
    return (
      <View style={styles.postsContainer}>
        <FlatList
          data={this.props.posts}
          renderItem={renderPostMinimizedItem}
          keyExtractor={(item) => item._id}
        />
        <Provider>
          <Portal>
            <Modal visible={this.state.visible} onDismiss={this.hideModal} contentContainerStyle={styles.containerStyle}>
              <Text>Example Modal.  Click outside this area to dismiss.</Text>
            </Modal>
          </Portal>
          <Button style={{ marginTop: 30 }} onPress={this.showModal}>
            Show
          </Button>
        </Provider>
      </View>
    );
  }
}

const renderPostMinimizedItem = ({ item }) => (
  <PostMinimized
    caption={item.caption}
    content={item.preview}
    displayName={item.author.displayname}
    username={item.author.username}
    currentViews={item.currentViews}
    viewLimit={item.viewLimit}
  />
);

const styles = StyleSheet.create({
  postsContainer: {
    flex: 1,
  },
  containerStyle: {
    backgroundColor: '#fff',
    padding: 20,
  },
});

const mapStateToProps = (state) => (
  {
    posts: state.posts.all,
  }
);

export default connect(mapStateToProps, { fetchPosts })(Home);
