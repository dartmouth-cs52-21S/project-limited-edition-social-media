import React, { Component } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableHighlight,
} from 'react-native';
import { Icon } from 'react-native-elements';

class MenuButton extends Component {
  constructor(props) {
    super(props);
    if (this.props.editable) {
      this.inputRef = React.createRef();
    }
  }

  // highlight input field on touchablehighlight press
  onEditPress = () => {
    this.inputRef.current.focus();
  }

  // deciding whether to render the arrow icon on the right side of button
  renderArrow() {
    if (this.props.arrow) {
      return (
        <Icon name="chevron-forward-outline" type="ionicon" color="rgb(0,0,0)" />
      );
    } else {
      return (
        <></>
      );
    }
  }

  renderEditableOrViewOnly() {
    // adding any passed extra styles. Also not displaying text if it was not passed in.
    const primaryTextStyles = this.props.primaryText ? [styles.primaryText, this.props.extraPrimaryTextStyles] : { display: 'none' };
    const secondaryTextStyles = this.props.secondaryText ? [styles.secondaryText, this.props.extraSecondaryTextStyles] : { display: 'none' };
    const buttonPressColor = 'rgb(196, 193, 200)';
    if (this.props.editable) {
      return (
        <TouchableHighlight activeOpacity={1} underlayColor={buttonPressColor} style={styles.button} onPress={this.onEditPress}>
          <View style={this.props.centerText ? styles.centerButtonContent : styles.buttonContents}>
            <Text style={primaryTextStyles}>{this.props.primaryText}</Text>
            <TextInput
              ref={this.inputRef}
              returnKeyType="done"
              keyboardType={this.props.numericKeyboard ? 'numeric' : 'default'}
              maxLength={this.props.maxLength || 10}
              multiline={false}
              onChangeText={this.props.onChangeText}
              value={this.props.secondaryText}
              style={[secondaryTextStyles, { width: 'auto' }]}
              selectionColor="rgb(78, 20, 140)"
            />
          </View>
        </TouchableHighlight>
      );
    } else {
      return (
        <TouchableHighlight activeOpacity={1} underlayColor={buttonPressColor} style={styles.button} onPress={this.props.onPress}>
          <View style={this.props.centerText ? styles.centerButtonContent : styles.buttonContents}>
            <Text style={primaryTextStyles}>{this.props.primaryText}</Text>
            <View style={{ justifyContent: 'flex-end', flexDirection: 'row', width: '50%' }}>
              <Text style={secondaryTextStyles} numberOfLines={1} ellipsizeMode="tail">{this.props.secondaryText}</Text>
              {this.renderArrow()}
            </View>
          </View>
        </TouchableHighlight>
      );
    }
  }

  render() {
    return (
      <View style={[styles.container, this.props.extraButtonStyles]}>{this.renderEditableOrViewOnly()}</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '9%',
    backgroundColor: 'rgb(255,255,255)',
  },
  primaryText: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Gill Sans',
  },
  secondaryText: {
    fontStyle: 'italic',
    fontSize: 20,
    fontFamily: 'Gill Sans',
    width: '100%',
    textAlign: 'right',
  },
  button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'rgb(196, 193, 200)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  buttonContents: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerButtonContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MenuButton;
