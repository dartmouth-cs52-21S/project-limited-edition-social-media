import React from 'react';
import {
  StyleSheet, View, Text, ImageBackground, Dimensions,
} from 'react-native';

const PostMaximized = (props) => {
  const postProps = props.route.params;
  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: postProps.content }} style={styles.contentImage}>
        <View style={styles.topbar}>
          <View style={styles.topbarAuthor}>
            <Text style={styles.font}>
              {props.displayName ? props.displayName : 'author'}
            </Text>
          </View>
          <View style={styles.topbarTags}>
            {postProps.tags ? postProps.tags.map((tag) => {
              return (
                <View style={styles.topbarTagItem} key={tag}>
                  <Text style={styles.topbarTagItemText}>
                    #
                    {tag}
                  </Text>
                </View>
              );
            }) : null}
          </View>
          <View style={styles.topbarViewLimit}>
            <Text style={styles.topbarViewLimitText}>
              {postProps.currentViews !== undefined ? postProps.currentViews : 'nan'}
              /
              {postProps.viewLimit !== undefined ? postProps.viewLimit : 'nan'}
            </Text>
          </View>
        </View>
        <View style={styles.body}>
          <Text style={styles.bodyContent}>
            {postProps.caption ? postProps.caption : 'NO CAPTION'}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    padding: 0,
    margin: 0,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: 'black',
  },
  topbar: {
    height: '15%',
    width: '100%',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topbarAuthor: {
    flex: 1,
    marginLeft: '2%',
  },
  topbarTags: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: '5%',
  },
  topbarTagItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    opacity: 0.7,
    borderRadius: 5,
    marginLeft: '1%',
    marginRight: '1%',
  },
  topbarTagItemText: {
    color: 'black',
    textAlign: 'center',
    paddingLeft: '1%',
    paddingRight: '1%',
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

export default PostMaximized;
