import React, { Component } from 'react';
import {
  StyleSheet, View, FlatList, Text, Button,
  Image, StyleSheet, SafeAreaView, ScrollView,
} from 'react-native';
// import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getSearchedUsers } from '../actions/index';
// import userReducer from '../reducers/user-reducer.js';
import Dropdown from './dropdown';

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
    this.state = { searchterm: '' };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    console.log(event.target.value);
    this.setState({ searchterm: event.target.value });
    // this.props.onSearchChange(event.target.value);
    this.props.getSearchedUsers({ name: event.target.value });
  }

  // displayUsers() {
  // }
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
    console.log(this.props.users);
    return (
      <View style={styles.container}>
        <Text>
          Search
        </Text>
        <input onChange={this.onInputChange} value={this.state.searchterm} />
        <Button type="button" onClick={this.onInputChange} value={this.state.searchterm} />

        <View style={styles.flatListContainer}>
          <FlatList
            data={this.props.users}
            // data={[{ id: 'stuff', id2: 'stuff2' }]}
            renderItem={() => (<Dropdown>Drop Menu</Dropdown>)}
            keyExtractor={(item) => item.id}
          />
        </View>

      </View>
      <SafeAreaView style={styles.container}>
        <Searchbar
          placeholder="Find User"
          onChangeText={this.onChangeSearch}
          onIconPress={this.onIconPress}
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
  flatListContainer: {
    flex: 1,
    height: 100,
    width: 100,
  },
});

const mapStateToProps = (state) => ({
  users: state.search.searchedUsers,
});

export default connect(mapStateToProps, { getSearchedUsers })(Search);
