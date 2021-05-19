import React, { Component } from 'react';
import {
  StyleSheet, View, Text,
} from 'react-native';

class Search extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Search
        </Text>
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

export default Search;
