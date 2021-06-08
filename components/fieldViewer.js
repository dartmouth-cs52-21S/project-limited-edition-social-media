import React, { Component } from 'react';
import {
  StyleSheet, View, TextInput, Text, TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import MenuButton from './menu_button';

class FieldViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.route.params.fieldText,
    };
  }

  onTextChange = (newText) => {
    // checking to see what the character count would be if the hashtags were parsed
    // so that the hashtags do not exceed character limit
    if (this.props.route.params.hashtags) {
      const seperatedTags = [];
      // removing #s and seperating string by ' '
      newText.replace(/#/g, '').split(' ').forEach((tag) => {
        if (tag !== '') {
          // putting all words into an array
          seperatedTags.push(tag);
        }
      });
      // if the array has words then create a string out of them
      // seperated by #s, else just create an empty string
      const tagsString = seperatedTags.length === 0 ? '' : `#${seperatedTags.join(' #')}`;
      // if this new string does not exceed the character limit then update state
      if (!(tagsString.length > 600)) {
        // replacing multiple spaces with one space
        // got the regex '\s\s+' here:
        // https://stackoverflow.com/questions/1981349/regex-to-replace-multiple-spaces-with-a-single-space
        this.setState({ text: newText.replace(/\s\s+/g, ' ') });
      }
    } else {
    // replacing all whitespace with just a space
      this.setState({ text: newText.replace(/\s/g, ' ') });
    }
  }

  handleNavigationBack = () => {
    // navigating back to the previous route and sending updated text
    const dataToSendBack = {};
    dataToSendBack[`${this.props.route.params.field}`] = this.state.text;
    this.props.navigation.navigate(`${this.props.route.params.route}`, dataToSendBack);
  }

  renderEditableOrViewOnly() {
    if (this.props.route.params.editable) {
      return (
        <View>
          <TouchableOpacity style={styles.icon} onPress={this.handleNavigationBack}>
            <Icon name="chevron-back-outline" type="ionicon" color="rgb(0,0,0)" />
            <Text>Go Back</Text>
          </TouchableOpacity>
          <MenuButton primaryText={this.props.route.params.field} extraButtonStyles={styles.title} />
          <TextInput
            onChangeText={this.onTextChange}
            value={this.state.text}
            style={styles.inputText}
            autoFocus
            multiline
            blurOnSubmit
            maxLength={600}
            placeholder={`Type ${this.props.route.params.field} here...`}
            scrollEnabled={false}
            onSubmitEditing={this.handleNavigationBack}
            selectionColor="rgb(78, 20, 140)"
          />
        </View>
      );
    } else {
      return (
        <View>
          <TouchableOpacity style={styles.icon} onPress={this.handleNavigationBack}>
            <Icon name="chevron-back-outline" type="ionicon" color="rgb(0,0,0)" />
            <Text>Go Back</Text>
          </TouchableOpacity>
          <MenuButton primaryText={this.props.route.params.field} extraButtonStyles={styles.title} />
          <Text value={this.props.route.params.fieldText} style={styles.inputText} />
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>{this.renderEditableOrViewOnly()}</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'rgb(255,255,255)',
  },
  icon: {
    marginTop: 60,
    marginBottom: '2.5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    margin: '2.5%',
    fontStyle: 'italic',
    fontSize: 20,
    fontFamily: 'Gill Sans',
    width: '100%',
    height: '100%',
    textAlign: 'left',
  },
  title: {
    borderTopColor: 'rgb(196, 193, 200)',
    borderTopWidth: StyleSheet.hairlineWidth,
    height: 70,
  },
});

export default FieldViewer;
