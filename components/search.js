import React, { Component } from 'react';
import {
  StyleSheet, View, Text,
} from 'react-native';
import { withRouter } from 'react-router';
import { getSearchedUsers } from '../actions/index.js'
import userReducer from '../reducers/user-reducer.js';

// Includes both the bar itself and the dropdown with the list of queried
// users
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { searchterm: '' };
    this.onInputChange = this.onInputChange.bind(this); 
  }

  onInputChange(event) {
    console.log(event.target.value);
    this.setState({ searchterm: event.target.value });
    this.props.onSearchChange(event.target.value);
  }

  // in progress
  displayUsers() {
    // array of obejcts that are links to user's profiles
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Search
        </Text>
        <input onChange={this.onInputChange} value={this.state.searchterm} />
        <Button type="button" onClick={this.onInputChange} value={this.state.searchterm} />

        <View style={styles.container}>
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
});

const mapStateToProps = (state) => ( {
  users: state.search.searchedUsers
});



export default connect (mapStateToProps, {getSearchedUsers})(Search)