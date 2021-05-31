import React, { Component } from 'react';
import {
  StyleSheet, View, Platform, TouchableOpacity, TouchableHighlight, Text, StatusBar, Animated,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { Icon } from 'react-native-elements';
import CameraButton from './camera_button';

class NewPostCamera extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cameraPermission: null, // are we allowed to use the camera. 'granted' is yes, otherwise is no
      cameraView: Camera.Constants.Type.back, // front facing or back facing camera
      statusBarStyle: 'white-content', // changing status bar to white
      isVideo: false, // are we in video mode
      isRecording: false, // are we currently recording a video
      disableCameraPress: false, // disables camera buttons if true, used to prevent spamming of buttons
      captureButtonBorder: new Animated.Value(40), // controls the shape of the camera capture button
    };
    this.camera = React.createRef();
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      // resetting the state
      this.setState({
        statusBarStyle: 'white-content',
        disableCameraPress: false,
        isRecording: false,
        isVideo: false,
      });
      // asking for permission to use the camera
      (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        this.setState({ cameraPermission: (status === 'granted') });
      })();
    });
    this._unsubscribe2 = this.props.navigation.addListener('blur', () => {
      // changing the status bar back to black
      this.setState({ statusBarStyle: 'dark-content' });
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
    this._unsubscribe2();
  }

  handleClose = () => {
    this.props.navigation.goBack();
  }

  handleCameraRollClick = () => {
    this.setState({ disableCameraPress: true });
    (async () => {
      // Asking for permission to use camera roll
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        return status;
      }
      return 'granted';
    })().then(async (response) => {
      // allowing user to select a piece of media if given permissions
      if (response === 'granted') {
        // I set editting to false and quality to undefined to allow for gifs
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          quality: undefined,
        });

        // sending media to new post editor
        if (!result.cancelled) {
          if (result.type === 'image') {
            this.props.navigation.navigate('New Post', { contentUri: result.uri, previewUri: result.uri, type: 'image' });
          } else {
            this.props.navigation.navigate('New Post', { contentUri: result.uri, previewUri: null, type: 'video' });
          }
        }
      }
      this.setState({ disableCameraPress: false });
    }, (reject) => {
      this.setState({ disableCameraPress: false });
    });
  }

  // flips the direction of the camera: front facing or back facing
  handleCameraFlip = () => {
    this.setState((prevState) => ({
      cameraView: prevState.cameraView === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    }));
  }

  // asks for camera permissions from the user
  handleAskPermissions = () => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      this.setState({ cameraPermission: (status === 'granted') });
    })();
  }

  // switching to video mode
  handleVideoSwitch = () => {
    this.setState({ isVideo: true });
  }

  // switching to image mode
  handlePhotoSwitch = () => {
    this.setState({ isVideo: false });
  }

  handleCameraPress = async () => {
    if (!this.state.cameraPermission) {
      this.handleAskPermissions();
    } else if (this.camera.current) {
      if (this.state.isRecording) {
        this.setState({ disableCameraPress: true });
        Animated.timing(this.state.captureButtonBorder, {
          toValue: 40,
          duration: 500,
          useNativeDriver: true,
        }).start();
        await this.camera.current.stopRecording();
      } else if (!this.state.isVideo) {
        this.setState({ disableCameraPress: true });
        const image = await this.camera.current.takePictureAsync({ quality: 1 });
        this.props.navigation.navigate('New Post', { contentUri: image.uri, previewUri: image.uri, type: 'image' });
      } else {
        this.setState({ isRecording: true, disableCameraPress: false });
        Animated.timing(this.state.captureButtonBorder, {
          toValue: 15,
          duration: 500,
          useNativeDriver: true,
        }).start();
        const video = await this.camera.current.recordAsync();
        this.setState({ isRecording: false });
        const image = await this.camera.current.takePictureAsync({ quality: 1 });
        this.props.navigation.navigate('New Post', { contentUri: video.uri, previewUri: image.uri, type: 'video' });
      }
    }
  }

  renderError() {
    if (!this.state.cameraPermission) {
      return (
        <View style={styles.error}>
          <Text style={styles.error}>We need permissions to use the camera.</Text>
        </View>
      );
    } else {
      return (
        <></>
      );
    }
  }

  renderCameraOverlay() {
    // if recording turning off parts of the overlay
    const displayNone = { display: this.state.isRecording ? 'none' : 'inline' };
    return (
      <View style={styles.cameraOverlay}>
        <View style={[styles.closeButton, displayNone]}>
          <Icon
            name="close-outline"
            type="ionicon"
            color="rgb(255, 255, 255)"
            size={46}
            containerStyle={{ borderRadius: 15 }}
            onPress={this.handleClose}
          />
        </View>
        {this.renderError()}
        <View style={styles.cameraOptions}>
          <CameraButton
            iconText="Album"
            disabled={this.state.disableCameraPress}
            iconName="image-outline"
            iconType="ionicon"
            handlePress={this.handleCameraRollClick}
            extraStyles={displayNone}
          />
          <Animated.View style={[styles.cameraCaptureOuter, { borderRadius: Animated.add(this.state.captureButtonBorder, new Animated.Value(7)) }]}>
            <TouchableOpacity disabled={this.state.disableCameraPress} onPress={this.handleCameraPress}>
              <Animated.View style={[styles.cameraCaptureInner, { borderRadius: this.state.captureButtonBorder }]} />
            </TouchableOpacity>
          </Animated.View>
          <CameraButton
            iconText="Flip"
            iconName="camera-reverse-outline"
            iconType="ionicon"
            handlePress={this.handleCameraFlip}
            extraStyles={displayNone}
          />
        </View>
        <View style={[styles.tabs, displayNone]}>
          <TouchableOpacity
            style={[styles.tab,
              { borderBottomColor: this.state.isVideo ? 'rgba(78, 20, 140, 0)' : 'rgba(78, 20, 140, 1)' }]}
            onPress={this.handlePhotoSwitch}
          >
            <Text style={styles.text}>
              Photo
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab,
              { borderBottomColor: this.state.isVideo ? 'rgba(78, 20, 140, 1)' : 'rgba(78, 20, 140, 0)' }]}
            onPress={this.handleVideoSwitch}
          >
            <Text style={styles.text}>
              Video
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderCamera() {
    if (this.state.cameraPermission) {
      return (
        <Camera ref={this.camera}
          style={styles.camera}
          type={this.state.cameraView}
        >
          {this.renderCameraOverlay()}
        </Camera>
      );
    } else {
      return (
        <TouchableHighlight style={[styles.camera, { backgroundColor: 'rgb(0,0,0)' }]}
          activeOpacity={0.7}
          underlayColor="rgb(50,50,50)"
          onPress={this.handleAskPermissions}
        >
          {this.renderCameraOverlay()}
        </TouchableHighlight>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={this.state.statusBarStyle} />
        {this.renderCamera()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  cameraOverlay: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginTop: 25,
  },
  closeButton: {
    margin: 20,
    flexGrow: 1,
    opacity: 0.7,
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  cameraCaptureInner: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(78, 20, 140, 1)',
    borderWidth: 2,
    borderColor: 'white',
  },
  cameraCaptureOuter: {
    width: 94,
    height: 94,
    backgroundColor: 'rgba(78, 20, 140, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  tabs: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgb(255,255,255)',
    height: 80,
    width: '100%',
    opacity: 0.7,
  },
  tab: {
    marginLeft: 25,
    marginRight: 25,
    borderBottomWidth: 3,
    width: 60,
  },
  text: {
    color: 'rgb(78, 20, 140)',
    fontSize: 21,
    textAlign: 'center',
  },
  error: {
    width: '100%',
    color: 'rgb(255,255,255)',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 130,
  },
});

export default NewPostCamera;
