import React, { Component } from 'react';
import {
  StyleSheet, View, Text, ImageBackground,
} from 'react-native';

class PostMinimized extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={{ uri: this.props.content }} style={styles.contentImage}>
          <View style={styles.subcontainer}>
            <Text style={styles.font}>
              {this.props.caption ? this.props.caption : 'NO CAPTION'}
            </Text>
          </View>
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
    backgroundColor: 'black',
    borderRadius: 10,
  },
  subcontainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '20%',
  },
  contentImage: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  font: {
    color: 'white',
  },
});

export { PostMinimized, renderPostMinimizedItem };
