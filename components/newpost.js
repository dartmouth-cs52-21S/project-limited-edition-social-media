import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Image,
} from 'react-native';
import { connect } from 'react-redux';
import MenuButton from './menu_button';
import { createPost } from '../actions';

class NewPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      preview: 'https://facebook.github.io/react/logo-og.png',
      caption: '',
      maxViews: '100',
      blur: '5',
      hashtags: [],
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
          const tags = this.props.route.params.hashtags;
          // looping through hashtags string word by word and inserting them into an array
          tags.replace(/#/g, '').split(' ').forEach((tag) => {
            if (tag !== '') {
              seperatedTags.push(tag);
            }
          });
          this.setState({ hashtags: seperatedTags });
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

  onPublishPress = () => {
    // sending post to server for creation and navigating to home page
    this.props.createPost(this.props.navigation, {
      caption: this.state.caption,
      content: this.state.preview,
      viewLimit: this.state.maxViews,
      currentViews: 0,
      hashtags: this.state.hashtags,
      coverBlur: this.state.blur,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.preview}>
          <Text style={styles.text}>Cover Preview</Text>
          <Image style={styles.image} source={{ uri: this.state.preview }} blurRadius={parseInt(this.state.blur, 10) || 0} />
        </View>
        <MenuButton
          primaryText="Blur"
          secondaryText={this.state.blur}
          editable
          maxLength={2}
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

export default connect(null, { createPost })(NewPost);
