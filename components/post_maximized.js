import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, Text, ImageBackground, Dimensions,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Video } from 'expo-av';
import { Icon } from 'react-native-elements';
import { updatePost } from '../actions';

const PostMaximized = (props) => {
  const postProps = props.route.params;
  let post = null;

  useEffect(() => {
    props.updatePost(postProps.id, { currentViews: postProps.currentViews + 1 });
  }, []);

  const video = React.createRef();

  const postOverlay = (
    <View style={styles.overlayContainer}>
      <View style={styles.statusBar} />
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
        <Icon
          name="close-outline"
          type="ionicon"
          color="rgb(255, 255, 255)"
          size={46}
          containerStyle={{ borderRadius: 15 }}
          onPress={() => {
            props.navigation.goBack();
          }}
        />
      </View>
      <View style={styles.topbar}>
        <View style={styles.topbarAuthor}>
          <Text style={styles.font}>
            {postProps.displayName ? postProps.displayName : 'author'}
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
            {postProps.currentViews !== undefined ? postProps.viewLimit - postProps.currentViews : 'nan'}
            Left/
            {postProps.viewLimit !== undefined ? postProps.viewLimit : 'nan'}
          </Text>
        </View>
      </View>
      <View style={styles.caption}>
        <Text style={styles.captionContent}>
          {postProps.caption ? postProps.caption : 'NO CAPTION'}
        </Text>
      </View>
    </View>
  );

  if (postProps.type === 'video') {
    post = (
      <View style={styles.container}>
        <Video
          ref={video}
          source={{ uri: postProps.content }}
          style={styles.backgroundVideo}
          isLooping
          resizeMode="cover"
          onLoad={() => { video.setPositionAsync(0); video.current.playAsync(); }}
        />
        {postOverlay}
      </View>
    );
  } else {
    post = (
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: postProps.content }}
          style={styles.contentImage}
        >
          {postOverlay}
        </ImageBackground>
      </View>
    );
  }
  return post;
};

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const statusBarHeight = getStatusBarHeight();

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  overlayContainer: {
    padding: 0,
    margin: 0,
    width: '100%',
    height: '100%',
  },
  statusBar: {
    height: statusBarHeight,
    width: '100%',
  },
  container: {
    padding: 0,
    margin: 0,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: 'black',
  },
  topbar: {
    height: '3%',
    width: '100%',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
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
  caption: {
    minHeight: '5%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    opacity: 0.5,
  },
  captionContent: {
    color: 'white',
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

export default connect(null, { updatePost })(PostMaximized);
