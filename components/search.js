import React, { Component } from 'react';
import {
  Image, StyleSheet, SafeAreaView,
} from 'react-native';
import { connect } from 'react-redux';
import { List, Searchbar } from 'react-native-paper';
import { getSearchedUsers } from '../actions';

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
          value={this.state?.searchQuery || ''}
        />

        <List.Section style={styles.listSection}>
          <List.Subheader>Press enter to search by username</List.Subheader>
          {(this.state?.users || []).map(this.renderUser)}
        </List.Section>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
