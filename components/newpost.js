import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Image,
} from 'react-native';
import MenuButton from './menu_button';

class NewPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      caption: '',
      maxViews: '100',
      blur: '5',
      hashtags: [],
    };
  }

  componentDidUpdate() {
    this.props.navigation.addListener('focus', () => {
      if (this.props.route.params.Caption || this.props.route.params.Caption === '') {
        this.setState({ caption: this.props.route.params.Caption });
      }
      if (this.props.route.params.hashtags || this.props.route.params.hashtags === '') {
        const seperatedTags = [];
        const tags = this.props.route.params.hashtags;
        // looping through hashtags word by word
        tags.replace(/#/g, '').split(' ').forEach((tag) => {
          if (tag !== '') {
            seperatedTags.push(tag);
          }
        });
        this.setState({ hashtags: seperatedTags });
      }
    });
  }

  /// text input change event handlers
  onMaxViewsChange = (text) => {
    // removing periods since those are the only non-numerical input from numeric keyboard
    this.setState({ maxViews: text.replace(/\./g, '') });
  }

  onBlurChange = (text) => {
    // doing the same as onMaxViewsChange
    this.setState({ blur: text.replace(/\./g, '') });
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
    });
  }

  onPublishPress = () => {
    // call action to send post
    // navigate to home page?
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.preview}>
          <Text style={styles.text}>Cover Preview</Text>
          <Image style={styles.image} source={{ uri: 'https://facebook.github.io/react/logo-og.png' }} blurRadius={parseInt(this.state.blur, 10) || 0} />
        </View>
        <MenuButton primaryText="Blur" secondaryText={this.state.blur} editable maxLength={2} onChangeText={this.onBlurChange} numericKeyboard extraButtonStyles={styles.blurButton} />
        <MenuButton primaryText="Max Views" secondaryText={this.state.maxViews} maxLength={7} editable onChangeText={this.onMaxViewsChange} numericKeyboard />
        <MenuButton primaryText="Caption" secondaryText={this.state.caption || 'Write a caption'} onPress={this.onCaptionPress} arrow />
        <MenuButton primaryText="hashtags" secondaryText={this.state.hashtags.length !== 0 ? `#${this.state.hashtags.join(' #')}` : 'Include some #hashtags'} onPress={this.onHashtagsPress} arrow />
        <MenuButton primaryText="Publish" onPress={this.onPublishPress} centerText extraButtonStyles={styles.publishButton} extraPrimaryTextStyles={styles.publishText} />
      </View>
    );
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
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  image: {
    width: '90%',
    height: '85%',
    borderRadius: 50,
  },
  publishText: {
    color: 'rgb(78, 20, 140)',
    fontSize: 30,
  },
  publishButton: {
    borderBottomColor: 'rgb(255,255,255)',
    borderTopColor: 'rgb(196, 193, 200)',
    borderTopWidth: 2,
    marginTop: 'auto',
    height: 90,
  },
  blurButton: {
    borderTopColor: 'rgb(196, 193, 200)',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});

export default NewPost;
