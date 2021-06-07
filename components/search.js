import React, { Component } from 'react';
import {
  StyleSheet, Text, FlatList, SafeAreaView,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import {
  getSearchedUsers,
} from '../actions';

const DEFAULT_STATE = {
  searchQuery: '',
  users: [],
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.renderUser = this.renderUser.bind(this);
  }

  componentDidMount() {
    this.setState(DEFAULT_STATE);
  }

  onChangeSearch(searchQuery) {
    if (!searchQuery) {
      this.setState(DEFAULT_STATE);
      return;
    }

    getSearchedUsers(searchQuery).then(({ data: users }) => this.setState({
      searchQuery, users,
    }));
  }

  renderUser = ({ item }) => (
    <Text>
      {item.displayname}
    </Text>
  );

  render() {
    console.warn(this.state);
    return (
      <SafeAreaView style={styles.container}>
        <Searchbar
          placeholder="Find User"
          onChangeText={this.onChangeSearch}
          value={this.state?.searchQuery || ''}
        />

        <FlatList
          data={this.state?.users || []}
          renderItem={this.renderUser}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default Search;
