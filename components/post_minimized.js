import React, { Component } from 'react';
import {
  StyleSheet, View, Text, ImageBackground, Dimensions, TouchableHighlight,
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { connect } from 'react-redux';
// import { updateFollow } from '../actions';

class PostMinimized extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  setVisible = () => {
    const currVisibility = this.state.visible;
    this.setState({ visible: !currVisibility });
  }

  openProfileModal = () => {
    this.props.showModal(this.props);
    // const { username } = this.props;
    // this.props.updateFollow(username);
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={{ uri: this.props.content }} style={styles.contentImage}>
          <View style={styles.subcontainer}>
            <View style={styles.topbar}>
              <TouchableHighlight style={styles.topbarAuthor} onPress={() => this.openProfileModal()}>
                <Text style={styles.font}>
                  {this.props.displayName || 'author'}
                </Text>
              </TouchableHighlight>
              <View style={styles.topbarViewLimit}>
                <Text style={styles.topbarViewLimitText}>
                  {this.props.currentViews !== undefined ? this.props.currentViews : 'nan'}
                  /
                  {this.props.viewLimit || 'nan'}
                </Text>
              </View>
            </View>
            <View style={styles.body}>
              <Text style={styles.bodyContent}>
                {this.props.caption || 'NO CAPTION'}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    marginVertical: '1%',
    marginHorizontal: '5%',
    backgroundColor: 'black',
    borderRadius: 10,
  },
  topbar: {
    height: '20%',
    width: '100%',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topbarAuthor: {
    flex: 1,
    marginLeft: '2%',
  },
  topbarViewLimit: {
    flex: 1,
    marginRight: '2%',
  },
  topbarViewLimitText: {
    color: 'white',
    textAlign: 'right',
  },
  body: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyContent: {
    color: 'white',
    marginBottom: '8%',
  },
  subcontainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: windowHeight * 0.25,
  },
  contentImage: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  font: {
    color: 'white',
  },
});

export default PostMinimized;

// export default connect(null, { updateFollow })(PostMinimized);
