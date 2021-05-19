import React from 'react';
import WebView from 'react-native-webview';

const VideoDetail = (props) => {
  // example of destructuring, the below is equivalent to props.route.params.video
  const { route } = props;
  const { video } = route.params;

  return (
    <WebView
      source={{ uri: `https://www.youtube.com/embed/${video.id.videoId}` }}
      automaticallyAdjustContentInsets={false}
    />
  );
};

export default VideoDetail;
