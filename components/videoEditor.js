import React, { Component } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Image,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Video } from 'expo-av';
import * as VideoThumbnails from 'expo-video-thumbnails';
import MenuButton from './menu_button';

// there is a bug in the expo-video-thumbnails package
// where getThumbnailAsync produces the same thumbnail
// for the video times that are within a second of each other
// https://github.com/expo/expo/issues/10400
class VideoEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: props.route.params.contentUri,
      thumbnail: 'https://facebook.github.io/react/logo-og.png',
      currentTimestamp: 0,
      displayError: 'none',
    };
  }

  async componentDidMount() {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        this.state.video,
        {
          time: this.state.currentTimestamp,
          quality: 1,
        },
      );
      this.setState({ thumbnail: uri });
    } catch (e) {
      // on error the thumbnail will default to the react logo
      // since it was set in the constructor

      // displaying error message
      this.setState({ displayError: 'flex' });
    }
  }

  onConfirmPress = () => {
    // navigating to new post editor with content/preview
    this.props.navigation.navigate('New Post',
      {
        contentUri: this.state.video,
        previewUri: this.state.thumbnail,
        type: 'video',
      });
  }

  onBackPress = () => {
    this.props.navigation.goBack();
    // need to call replace here to remount camera because
    // the camera flip does not work after you record a video
    // I think it's a bug in expo-camera but good chance I just
    // messed up somewhere in camera.js
    this.props.navigation.replace('Camera');
  }

  onThumbnailSelect = async () => {
    this.setState({ displayError: 'none' });
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        this.state.video,
        {
          time: this.state.currentTimestamp,
          quality: 1,
        },
      );
      this.setState({ thumbnail: uri });
    } catch (e) {
      // on error the thumbnail will default to the react logo
      // since it was set in the constructor

      // displaying error message
      this.setState({ displayError: 'flex' });
    }
  }

  onVideoPlaybackChange = (status) => {
    // getting the current position in the video player is at
    if (status?.positionMillis) {
      this.setState({ currentTimestamp: status.positionMillis });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topMenu}>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={this.onBackPress}>
            <Icon name="chevron-back-outline" type="ionicon" color="rgb(0,0,0)" />
            <Text>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={this.onConfirmPress}>
            <Icon name="checkmark-outline" type="ionicon" color="rgb(0,0,0)" />
            <Text>Done</Text>
          </TouchableOpacity>
        </View>
        <Video
          style={styles.video}
          source={{ uri: this.state.video }}
          useNativeControls
          resizeMode="contain"
          onPlaybackStatusUpdate={this.onVideoPlaybackChange}
        />
        <Text style={styles.text}>Cover Preview</Text>
        <Image style={styles.image} source={{ uri: this.state.thumbnail }} />
        <MenuButton
          primaryText="Set Post Cover"
          centerText
          extraButtonStyles={styles.button}
          onPress={this.onThumbnailSelect}
        />
        <Text style={styles.smallText}>
          *Sets the currently viewed second of the video as a cover for your post.*
        </Text>
        <Text style={[styles.smallTextm, { color: 'rgb(255,0,0)', display: this.state.displayError }]}>
          *There was an error setting the cover.*
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  },
  topMenu: {
    marginRight: 10,
    marginLeft: 5,
    marginTop: 60,
    marginBottom: '2.5%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Gill Sans',
    marginTop: 30,
  },
  smallText: {
    width: '90%',
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  image: {
    width: '90%',
    height: 255,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  video: {
    width: '100%',
    height: 300,
  },
  button: {
    width: '42%',
    backgroundColor: 'rgb(255,255,255)',
    borderColor: 'rgb(196, 193, 200)',
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 10,
    marginTop: 10,
  },
});

export default VideoEditor;
