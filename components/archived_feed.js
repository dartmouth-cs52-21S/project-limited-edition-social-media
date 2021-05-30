import React, { Component } from 'react';
import {
  FlatList, View, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import { renderPostMinimizedItem } from './post_minimized';

class ArchivedFeed extends Component {
  componentDidMount() {
    this._fetchPostsCleanup = this.props.navigation.addListener('focus', () => {
      this.props.fetchPosts();
    });
  }

  componentWillUnmount() {
    this._fetchPostsCleanup();
  }

  render() {
    return (
      <View style={styles.postsContainer}>
        <FlatList
          data={this.props.posts}
          renderItem={renderPostMinimizedItem}
          keyExtractor={(item) => item._id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  postsContainer: {
    flex: 1,
  },
});

const mapStateToProps = (state) => (
  {
    posts: state.posts.all,
  }
);

export default connect(mapStateToProps, { fetchPosts })(ArchivedFeed);