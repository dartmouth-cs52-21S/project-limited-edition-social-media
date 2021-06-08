import React, { Component } from 'react';
import {
  Image, StyleSheet, SafeAreaView, ScrollView,
} from 'react-native';

import { List, Searchbar } from 'react-native-paper';
import {
  getSearchedUsers,
} from '../actions';

const DEFAULT_STATE = {
  searchQuery: '',
  users: [],
};

const DEFAULT_IMG = 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png';

class Search extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.renderUser = this.renderUser.bind(this);
    this.renderUserProfile = this.renderUserProfile.bind(this);
    this.onIconPress = this.onIconPress.bind(this);
  }

  componentDidMount() {
    this.setState(DEFAULT_STATE);
  }

  onIconPress() {
    const { searchQuery } = this.state;
    if (!searchQuery) {
      this.setState(DEFAULT_STATE);
      return;
    }

    getSearchedUsers(searchQuery).then(({ data: users }) => this.setState({
      searchQuery, users,
    }));
  }

  onChangeSearch(searchQuery) {
    this.setState(searchQuery ? { searchQuery } : DEFAULT_STATE);
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
      key={item.id}
      left={() => (
        <Image
          style={styles.tinyLogo}
          source={{ uri: item.profilePic || DEFAULT_IMG }}
        />
      )}
    />
  );

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Searchbar
          placeholder="Find User"
          onChangeText={this.onChangeSearch}
          onIconPress={this.onIconPress}
          onSubmitEditing={() => {
            this.onIconPress();
          }}
          value={this.state?.searchQuery || ''}
        />

        <ScrollView style={styles.listSection}>
          <List.Section>
            <List.Subheader>Press enter to search by username</List.Subheader>
            {(this.state?.users || []).map(this.renderUser)}
          </List.Section>
        </ScrollView>
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
