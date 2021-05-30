import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, Text, Button,
} from 'react-native';

class Archive extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.navigation = navigation;
  }

  // placeholder
  handleArchivePress() {
    this.props.handleArchivePress(this.navigation);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Your Archive
        </Text>
        <Button title="Archived Posts"
          onPress={
            () => {
              this.handleArchivePress();
            }
        }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: 400,
    height: 300,
  },
});

export default connect(null, { handleArchivePress })(Archive);
