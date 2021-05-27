import React, { Component } from 'react';
import {
  StyleSheet, View, Text, ImageBackground,
} from 'react-native';

class PostMinimized extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={{ uri: this.props.content }} style={styles.contentImage}>
          <Text style={styles.font}>
            {this.props.caption ? this.props.caption : 'NO CAPTION'}
          </Text>
        </ImageBackground>
      </View>
    );
  }
}

const renderPostMinimizedItem = (props) => {
  return <PostMinimized caption={props.item.caption} content={props.item.content} />;
};

const styles = StyleSheet.create({
  container: {
    marginVertical: '1%',
    marginHorizontal: '5%',
    borderRadius: 10,

    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  contentImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  font: {
    color: 'white',
  },
});

export { PostMinimized, renderPostMinimizedItem };
