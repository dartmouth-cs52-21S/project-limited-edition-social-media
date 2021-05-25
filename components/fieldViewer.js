import React, { Component } from 'react';
import {
  StyleSheet, View, TextInput, Text, TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import MenuButton from './menu_button';

// (may delete this when submitting final project, just here for reference)
// potentially reusable when editting an existing post or viewing an existing post
// if you are using this in the future remember to:
// set this component up in a stack navigation(or whichever kind of navigation)
// turn off the navigation header using 'headerShown: false'
// use navigation.navigate(thisComponent, params) to navigate to this component
//      Within params set the following:
//        field: name of the field to be displayed
//        fieldText: the text to be displayed under the field
//        editable: should the fieldViewer component be view only or editable
//        route: the component you are navigating from
// if making an editable field:
//   within your component add a listener with 'navigation.addListener('focus', () => {})'
//   within that listener update your components state with 'this.props.route.params.(passed in field name from above)'
class FieldViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.route.params.fieldText,
    };
  }

  // replacing any whitespace with just a space
  onTextChange = (newText) => {
    this.setState({ text: newText.replace(/\s/g, ' ') });
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
          <TextInput onChangeText={this.onTextChange}
            value={this.state.text}
            style={styles.inputText}
            autoFocus
            multiline
            blurOnSubmit
            maxLength={600}
            placeholder={`Type ${this.props.route.params.field} here...`}
            scrollEnabled={false}
            onSubmitEditing={this.handleNavigationBack}
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
  },
});

export default FieldViewer;
