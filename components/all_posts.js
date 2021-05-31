import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  FlatList, View, StyleSheet,
} from 'react-native';
import { fetchPosts } from '../actions';
import { renderPostMinimizedItem } from './post_minimized';

const AllPosts = (props) => {
  useEffect(() => {
    const unListen = props.navigation.addListener('focus', () => {
      props.fetchPosts();
    });
    return () => {
      unListen();
    };
  });

  return (
    <View style={styles.postsContainer}>
      <FlatList
        data={props.posts}
        renderItem={renderPostMinimizedItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

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

export default connect(mapStateToProps, { fetchPosts })(AllPosts);
