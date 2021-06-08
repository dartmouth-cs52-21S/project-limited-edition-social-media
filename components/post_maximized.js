import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, Text, ImageBackground, Dimensions,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Video } from 'expo-av';
import { Icon } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { updateArchives } from '../actions';

const PostMaximized = (props) => {
  const postProps = props.route.params;
  let post = null;

  const onArchivePress = () => {
    props.updateArchives(postProps.id);
  };

  const video = React.createRef();
  const renderTags = ({ item, index }) => {
    return (
      <View style={styles.topbarTagItem} key={item}>
        <Text style={styles.topbarTagItemText}>
          #
          {item}
        </Text>
      </View>
    );
  };
  const postOverlay = (
    <View style={styles.overlayContainer}>
      <View style={styles.statusBar} />
      <View style={styles.topBar}>
        <View style={styles.closeIconWrapper}>
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
        <View style={styles.topbarAuthor}>
          <Text style={styles.font}>
            {postProps.author.displayname ? postProps.author.displayname : 'author'}
          </Text>
        </View>
        <View style={styles.topbarViewLimit}>
          <Text style={[styles.topbarViewLimitText, { display: postProps.archive ? 'none' : 'flex' }]}>
            {postProps.currentViews !== undefined ? postProps.viewLimit - postProps.currentViews : 'nan'}
            /
            {postProps.viewLimit !== undefined ? postProps.viewLimit : 'nan'}
          </Text>
        </View>
      </View>
      <View style={styles.tagWrapper}>
        <Carousel
          data={postProps.tags}
          renderItem={renderTags}
          sliderWidth={windowWidth}
          itemWidth={windowWidth}
          enableSnap
          loop
          autoplay
          autoplayInterval={2000}
          lockScrollWhileSnapping
          contentContainerStyle={styles.topbarTags}
        />
      </View>
      <View style={[styles.caption, { display: postProps.caption ? 'flex' : 'none' }]}>
        <Text style={styles.captionContent}>
          {postProps.caption}
        </Text>
      </View>
      <TouchableOpacity style={[styles.bottom, { display: postProps.archive ? 'none' : 'flex' }]} onPress={onArchivePress}>
        <MaterialCommunityIcons name="archive" color="rgb(255,255,255)" size={50} />
      </TouchableOpacity>
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
  closeIconWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  tagWrapper: {
    height: '3%',
    width: '100%',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  topbarAuthor: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    opacity: 0.7,
    borderRadius: 5,
    marginLeft: '1%',
    marginRight: '1%',
    paddingLeft: '4%',
    paddingRight: '4%',
  },
  topbarTagItemText: {
    color: 'black',
    textAlign: 'center',
  },
  topbarViewLimit: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'center',
    alignItems: 'center',
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
  bottom: {
    position: 'absolute',
    bottom: 50,
    left: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  font: {
    color: 'white',
  },
});

export default connect(null, { updateArchives })(PostMaximized);
