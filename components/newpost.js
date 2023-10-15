/* eslint-disable global-require */
import React, { Component } from 'react';
import {
  StyleSheet, View, Text, ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import { Buffer } from 'buffer';
import { ImageManipulator } from 'expo-image-crop';
import * as FileSystem from 'expo-file-system';
import AnimatedLoader from 'react-native-animated-loader';
import MenuButton from './menu_button';
import { createPost } from '../actions';
import uploadImage from '../s3';

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preview: this.props.route.params?.previewUri || 'https://facebook.github.io/react/logo-og.png', // uri format
      // eslint-disable-next-line react/no-unused-state
      content: '', // uri format
      type: '', // string that says 'image' or 'video'
      caption: '',
      maxViews: '100',
      blur: '5',
      hashtags: [],
      base64: '',
      showImageEditor: false,
      isLoading: false,
      showError: false,
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      if (this.props.route.params) {
        // getting updated states from fieldViewer component
        if (this.props.route.params.Caption || this.props.route.params.Caption === '') {
          this.setState({ caption: this.props.route.params.Caption });
        }
        if (this.props.route.params.hashtags || this.props.route.params.hashtags === '') {
          const seperatedTags = [];
          const tagSet = new Set();

          const tags = this.props.route.params.hashtags;
          // looping through hashtags string word by word and inserting them into an array
          tags.replace(/#/g, '').split(' ').forEach((tag) => {
            if (tag !== '' && !tagSet.has(tag)) {
              seperatedTags.push(tag);
              tagSet.add(tag);
            }
          });
          this.setState({ hashtags: seperatedTags });
        }
        // getting the content and content type from the camera
        if (this.props.route.params.contentUri) {
          // eslint-disable-next-line react/no-unused-state
          this.setState({ content: this.props.route.params.contentUri });
        }
        if (this.props.route.params.type) {
          this.setState({ type: this.props.route.params.type });
        }
        // console.log(this.props.route.params.base64);
        if (this.props.route.params.base64) {
          this.setState({ base64: this.props.route.params.base64 });
        }
      }
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  /// text input change event handlers
  onMaxViewsChange = (text) => {
    // regex expression removes non-numeric(not 0-9) characters from input
    // got the regex expression from here: https://stackoverflow.com/questions/32946793/react-native-textinput-that-only-accepts-numeric-characters
    this.setState({ maxViews: text.replace(/[^0-9]/g, '') });
  }

  onBlurChange = (text) => {
    // doing the same as onMaxViewsChange
    this.setState({ blur: text.replace(/[^0-9]/g, '') });
  }

  /// button press event handlers
  onCaptionPress = () => {
    this.props.navigation.navigate('Edit Field', {
      field: 'Caption',
      fieldText: this.state.caption,
      editable: true,
      route: 'New Post',
    });
  }

  onHashtagsPress = () => {
    this.props.navigation.navigate('Edit Field', {
      field: 'hashtags',
      fieldText: this.state.hashtags.length === 0 ? '' : `#${this.state.hashtags.join(' #')}`,
      editable: true,
      route: 'New Post',
      hashtags: true,
    });
  }

  onImageEditPress = () => {
    this.setState((prevState) => ({
      showImageEditor: !prevState.showImageEditor,
    }));
  }

  onPublishPress = async () => {
    this.setState({ isLoading: true });
    const previewBase64 = await FileSystem.readAsStringAsync(this.state.preview, { encoding: FileSystem.EncodingType.Base64 });
    // Got code for file extension extraction here: https://stackoverflow.com/questions/54342873/how-to-get-file-extension-with-expo-filesystem
    const previewType = this.state.preview.substr(this.state.preview.lastIndexOf('.') + 1);
    const contentType = this.state.content.substr(this.state.content.lastIndexOf('.') + 1);
    // sending post to server for creation and navigating to home page
    if (this.state.base64 && previewBase64) {
      uploadImage(Buffer.from(this.state.base64, 'base64'), contentType).then((contentUrl) => {
        uploadImage(Buffer.from(previewBase64, 'base64'), previewType).then((previewUrl) => {
          this.props.createPost(this.props.navigation, {
            caption: this.state.caption,
            content: contentUrl,
            viewLimit: this.state.maxViews,
            currentViews: 0,
            hashtags: this.state.hashtags,
            coverBlur: this.state.blur,
            type: this.state.type,
            preview: previewUrl,
          });
        }).catch((error) => {
          console.log(error);
          this.setState({ isLoading: false });
          this.setState({ showError: true });
        });
      }).catch((error) => {
        console.log(error);
        this.setState({ isLoading: false });
        this.setState({ showError: true });
      });
    } else {
      this.setState({ isLoading: false });
      this.setState({ showError: true });
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <AnimatedLoader
          visible
          overlayColor="#ffffff"
          source={require('../assets/lf30_editor_yuqappkw.json')}
          animationStyle={styles.lottie}
          speed={1}
        >
          <Text style={styles.lottieText}>Publishing Your Post...</Text>
        </AnimatedLoader>
      );
    } else if (this.state.showError) {
      return (
        <View style={{
          justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%',
        }}
        >
          <Text>There was an error processing your post :(</Text>
          <MenuButton
            primaryText="Go Home"
            centerText
            onPress={() => {
              this.props.navigation.navigate('Camera');
              this.props.navigation.replace('Camera');
              this.props.navigation.navigate('Home');
            }}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.preview}>
            <Text style={styles.text}>Cover Preview</Text>
            <ImageBackground
              style={styles.image}
              imageStyle={{ borderRadius: 10, width: '100%', height: '100%' }}
              source={{ uri: this.state.preview }}
              blurRadius={parseInt(this.state.blur, 10) || 0}
            >
              <MenuButton
                primaryText="Edit Cover"
                centerText
                extraButtonStyles={{ height: '22%', width: '42%', backgroundColor: 'rgba(255,255,255,0.6)' }}
                onPress={this.onImageEditPress}
              />
              <ImageManipulator
                photo={{ uri: this.state.preview }}
                isVisible={this.state.showImageEditor}
                onPictureChoosed={(data) => {
                  this.setState({ preview: data.uri });
                }}
                onToggleModal={this.onImageEditPress}
                saveOptions={{
                  compress: 1,
                  format: 'png',
                }}
                borderColor="rgba(78, 20, 140, 0.5)"
              />
            </ImageBackground>
          </View>
          <MenuButton
            primaryText="Blur"
            secondaryText={this.state.blur}
            editable
            maxLength={3}
            onChangeText={this.onBlurChange}
            numericKeyboard
            extraButtonStyles={styles.blurButton}
          />
          <MenuButton
            primaryText="Max Views"
            secondaryText={this.state.maxViews}
            maxLength={7}
            editable
            onChangeText={this.onMaxViewsChange}
            numericKeyboard
          />
          <MenuButton
            primaryText="Caption"
            secondaryText={this.state.caption || 'Write a caption'}
            onPress={this.onCaptionPress}
            arrow
          />
          <MenuButton
            primaryText="hashtags"
            secondaryText={this.state.hashtags.length !== 0 ? `#${this.state.hashtags.join(' #')}` : 'Include some #hashtags'}
            onPress={this.onHashtagsPress}
            arrow
          />
          <MenuButton
            primaryText="Publish"
            onPress={this.onPublishPress}
            centerText
            extraButtonStyles={styles.publishButton}
            extraPrimaryTextStyles={styles.publishText}
          />
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Gill Sans',
  },
  preview: {
    width: '100%',
    height: '38%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  image: {
    width: '90%',
    height: '85%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  publishText: {
    color: '#468189',
    fontSize: 30,
  },
  publishButton: {
    borderBottomColor: 'rgb(255,255,255)',
    borderTopColor: 'rgb(196, 193, 200)',
    borderTopWidth: 2,
    marginTop: 'auto',
    height: '12%',
  },
  blurButton: {
    borderTopColor: 'rgb(196, 193, 200)',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  lottie: {
    width: 300,
    height: 300,
  },
  lottieText: {
    color: '#468189',
    fontSize: 25,
    fontWeight: '500',
    fontFamily: 'Gill Sans',
    fontStyle: 'italic',
  },
});

export default connect(null, { createPost })(NewPost);
