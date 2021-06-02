import React, { Component } from 'react';
import {
  StyleSheet, View, FlatList, Text, Button,
} from 'react-native';
// import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getSearchedUsers } from '../actions/index';
// import userReducer from '../reducers/user-reducer.js';
import Dropdown from './dropdown';

class Search extends Component {
  constructor(props) {
    super(props);
    // this.state = { searchterm: '' };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    console.log(event.target.value);
    // this.setState({ searchterm: event.target.value });
    // this.props.onSearchChange(event.target.value);
    this.props.getSearchedUsers(event.target.value);
  }

  // displayUsers() {
  // }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Search
        </Text>
        <input onChange={this.onInputChange} value={this.state.searchterm} />
        <Button type="button" onClick={this.onInputChange} value={this.state.searchterm} />

        <View style={styles.flatListContainer}>
          <FlatList
          // data={this.props.users}
            data={[{ id: 'stuff', id2: 'stuff2' }]}
            renderItem={Dropdown}
            keyExtractor={(item) => item.id}
          />
        </View>

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
