import React, { Component } from 'react';
import {
  StyleSheet, View, Text,
} from 'react-native';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class Home extends Component {
  renderJSXPostArray() {
    // eslint-disable-next-line react/destructuring-assignment
    return this.props.posts.map((post) => {
      // For each post, recall that it actually needs to be a link to the real post itself
      // Adapted from lab manual at https://cs52.me/assignments/lab/redux-platform/
      return (
        <View style={styles.container} key={post._id}>
          <Text>
            {post.caption}
          </Text>
        </View>
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          {this.renderJSXPostArray()}
        </Text>
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

const mapStateToProps = (state) => (
  {
    posts: state.posts.all,
  }
);

export default connect(mapStateToProps, { fetchPosts })(Home);
