/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
  TouchableHighlight,
} from 'react-native';

import youtubeSearch from '../youtube-api';

class VideoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: 'true facts',
      isLoading: true,
      dataSource: [],
    };

    this.renderVideoCell = this.renderVideoCell.bind(this);
  }

  // ---------- componentDidMount here! -----------//
  componentDidMount() {
    this.fetchData();
  }

  // ------------ put fetchData here! -------------//
  fetchData() {
    youtubeSearch(this.state.query)
      .then((responseData) => {
        this.setState({
          dataSource: responseData,
          isLoading: false,
        });
      }).catch((error) => {
        console.log(error);
      });
  }

  showVideoDetail(video) {
    // pass in video into this.props.navigation.state.params.video in navigated view
    this.props.navigation.navigate('Detail', { video });
  }

  renderLoadingView() {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  renderVideoCell(video) {
    return (
      <TouchableHighlight onPress={() => { this.showVideoDetail(video); }} underlayColor="orange">
        <View>
          <View style={styles.container}>
            <Image
              source={{ uri: video.snippet.thumbnails.default.url }}
              style={styles.thumbnail}
            />
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{video.snippet.title}</Text>
              <Text style={styles.subtitle}>{video.snippet.description}</Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    if (this.state.isLoading) {
      return this.renderLoadingView();
    }
    return (
      <View>
        <SearchBar
          backgroundColor="#c4302b"
          showsCancelButton={false}
          textFieldBackgroundColor="#c4302b"
          onChangeText={(query) => {
            this.setState({ query });
            this.fetchData();
          }}
          value={this.state.query}
        />

        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => { return this.renderVideoCell(item); }}
          keyExtractor={(item) => item.snippet.thumbnails.default.url}
          style={styles.listView}
        />
      </View>
    );
  }
}

export default VideoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgb(240,240,240)',
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginRight: 5,
    backgroundColor: 'black',
  },
  rightContainer: {
    flex: 1,
    padding: 5,
    height: 100,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 12,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgb(200,200,200)',
  },
  listView: {
    backgroundColor: 'rgb(240,240,240)',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
