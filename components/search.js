import React, { Component } from 'react';
import {
  Image, StyleSheet, SafeAreaView,
} from 'react-native';

import { List, Searchbar } from 'react-native-paper';
import {
  getSearchedUsers,
} from '../actions';

const DEFAULT_STATE = {
  searchQuery: '',
  users: [],
};

const DEFAULT_IMG = 'https://i.pinimg.com/236x/02/6a/cc/026acca08fb7beea6bd4ecd430e312bd.jpg';

class Search extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.renderUser = this.renderUser.bind(this);
    this.renderUserProfile = this.renderUserProfile.bind(this);
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

  renderUserProfile({ username }) {
    this.props.navigation.navigate('OtherUserProfile', {
      name: 'OtherUserProfile',
      username,
    });
  }

  renderUser = (item) => (
    <List.Item
      title={item.displayname || 'No Name'}
      onPress={() => this.renderUserProfile(item)}
      key={item.username}
      left={() => (
        <Image
          style={styles.tinyLogo}
          source={{ uri: item.profilePic || DEFAULT_IMG }}
        />
      )}
    />
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

        <List.Section style={styles.listSection}>
          <List.Subheader>Search by username</List.Subheader>
          {(this.state?.users || []).map(this.renderUser)}
        </List.Section>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  listSection: {
    width: '100%',
  },
});

export default Search;
