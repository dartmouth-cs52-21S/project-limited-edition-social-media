import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  FlatList, View, StyleSheet,
} from 'react-native';
import { fetchPosts } from '../actions';
import { renderPostMinimizedItem } from './post_minimized';

const AllPosts = (props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const unListen = props.navigation.addListener('focus', () => {
      props.fetchPosts();
    });
    return () => {
      unListen();
    };
  });

  const fetchPostsOnRefreshAsyncWrapper = async () => {
    await props.fetchPosts();
    setIsRefreshing(false);
  };

  const handlePullDownRefresh = () => {
    setIsRefreshing(true);
    fetchPostsOnRefreshAsyncWrapper();
  };

  return (
    <View style={styles.postsContainer}>
      <FlatList
        data={props.posts}
        renderItem={renderPostMinimizedItem}
        keyExtractor={(item) => item._id}
        onRefresh={handlePullDownRefresh}
        refreshing={isRefreshing}
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
