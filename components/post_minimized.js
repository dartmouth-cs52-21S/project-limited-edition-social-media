import React, { Component } from 'react';
import {
  StyleSheet, View, Text, ImageBackground, Dimensions,
} from 'react-native';

class PostMinimized extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={{ uri: this.props.content }} style={styles.contentImage}>
          <View style={styles.subcontainer}>
            <View style={styles.topbar}>
              <View style={styles.topbarAuthor}>
                <Text style={styles.font}>
                  {this.props.displayName ? this.props.displayName : 'author'}
                </Text>
              </View>
              <View style={styles.topbarViewLimit}>
                <Text style={styles.topbarViewLimitText}>
                  {this.props.currentViews !== undefined ? this.props.currentViews : 'nan'}
                  /
                  {this.props.viewLimit !== undefined ? this.props.viewLimit : 'nan'}
                </Text>
              </View>
            </View>
            <View style={styles.body}>
              <Text style={styles.bodyContent}>
                {this.props.caption ? this.props.caption : 'NO CAPTION'}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const renderPostMinimizedItem = (props) => {
  console.log(props.item);
  return (
    <PostMinimized
      caption={props.item.caption}
      content={props.item.content}
      displayName={props.item.author.displayName}
      currentViews={props.item.currentViews}
      viewLimit={props.item.viewLimit}
    />
  );
};

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    marginVertical: '1%',
    marginHorizontal: '5%',
    backgroundColor: 'black',
    borderRadius: 10,
  },
  topbar: {
    height: '20%',
    width: '100%',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topbarAuthor: {
    flex: 1,
    marginLeft: '2%',
  },
  topbarViewLimit: {
    flex: 1,
    marginRight: '2%',
  },
  topbarViewLimitText: {
    color: 'white',
    textAlign: 'right',
  },
  body: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyContent: {
    color: 'white',
    marginBottom: '8%',
  },
  subcontainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: windowHeight * 0.25,
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
