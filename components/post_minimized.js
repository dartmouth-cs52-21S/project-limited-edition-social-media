import React, { Component } from 'react';
import {
  StyleSheet, View, Text, ImageBackground, Dimensions, TouchableHighlight,
} from 'react-native';
import {
  Modal, Portal, Button, Provider,
} from 'react-native-paper';
// import { profileUser } from '../actions';

class PostMinimized extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  componentDidMount = () => {
    this.props.profileUser();
  };

  setVisible = () => {
    const currVisibility = this.state.visible;
    this.setState({ visible: !currVisibility });
  }

  showModal = () => {
    console.log('show modal');
    this.setVisible(true);
  }

  hideModal = () => {
    console.log('hide modal');
    this.setVisible(false);
  }

  openProfileModal = (postUsername) => {
    // if (this.props.user.username != postUsername) {

    // }
    console.warn('Creating Modal');
    return (
      <Provider>
        <Portal>
          <Modal onDismiss={this.hideModal} contentContainerStyle={styles.containerStyle}>
            <Text>Example Modal.  Click outside this area to dismiss.</Text>
          </Modal>
        </Portal>
        <Button style={{ marginTop: 30 }} onPress={this.showModal}>
          Show
        </Button>
      </Provider>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Provider>
          <Portal>
            <Modal onDismiss={this.hideModal} contentContainerStyle={styles.containerStyle}>
              <Text>Example Modal.  Click outside this area to dismiss.</Text>
            </Modal>
          </Portal>
          <Button style={{ marginTop: 30 }} onPress={this.showModal}>
            Show
          </Button>
        </Provider>
        <ImageBackground source={{ uri: this.props.content }} style={styles.contentImage}>
          <View style={styles.subcontainer}>
            <View style={styles.topbar}>
              <TouchableHighlight style={styles.topbarAuthor} onPress={() => this.openProfileModal()}>
                <Text style={styles.font}>
                  {this.props.displayName ? this.props.displayName : 'author'}
                </Text>
              </TouchableHighlight>
              <View style={styles.topbarViewLimit}>
                <Text style={styles.topbarViewLimitText}>
                  {this.props.currentViews !== undefined ? this.props.currentViews : 'nan'}
                  /
                  {this.props.viewLimit !== undefined ? this.props.viewLimit : 'nan'}
                </Text>
              </View>
            </View>
            <View style={styles.body}>
              <Text style={styles.bodyContent}>
                {this.props.caption ? this.props.caption : 'NO CAPTION'}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const renderPostMinimizedItem = ({ item }) => (
  <PostMinimized
    caption={item.caption}
    content={item.preview}
    displayName={item.author.displayname}
    username={item.author.username}
    currentViews={item.currentViews}
    viewLimit={item.viewLimit}
  />
);

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
  containerStyle: {
    backgroundColor: 'blue',
    padding: 20,
  },
});

// const mapStateToProps = ({ user }) => (
//   {
//     user,
//   }
// );

// export default connect(mapStateToProps, { profileUser })(PostMinimized, renderPostMinimizedItem);

export { PostMinimized, renderPostMinimizedItem };
