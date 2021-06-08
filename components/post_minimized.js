import React from 'react';
import {
  StyleSheet, View, Text, ImageBackground, Dimensions, TouchableOpacity, TouchableHighlight,
} from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const computeRarity = (viewLimit) => {
  if (viewLimit < 100) {
    // rare
    return '#D0D03E';
  } else if (viewLimit < 1000) {
    // medium rare
    return '#3ED087';
  } else {
    // commmon
    return '#3ED087';
  }
};

const renderTagItem = (tag) => (
  <View style={styles.topbarTagItem} key={tag}>
    <Text style={styles.topbarTagItemText}>
      #
      {tag}
    </Text>
  </View>
);

const renderTags = (tags) => {
  return (
    <View style={styles.tagWrapper}>
      {tags.map(renderTagItem)}
    </View>
  );
};

const PostMinimized = (props) => {
  const navigation = useNavigation();
  const rarity = computeRarity(props.viewLimit);
  const openProfileModal = () => props.showModal(props);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('PostFullScreen', { ...props, showModal: null })}
    >
      <ImageBackground
        source={{ uri: props.preview }}
        style={{ ...styles.contentImage, borderColor: rarity, borderWidth: 5 }}
        blurRadius={parseInt(props.blur, 10) || 0}
      >
        <View style={styles.subcontainer}>
          <View style={styles.topbar}>
            <TouchableHighlight style={styles.topbarAuthor} onPress={openProfileModal}>
              <Text style={styles.font}>
                {props.author.displayname || 'author'}
              </Text>
            </TouchableHighlight>
            <View style={styles.topbarTags}>
              <MaskedView
                style={styles.topbarMaskedView}
                maskElement={(
                  <LinearGradient
                    colors={['black', 'transparent']}
                    style={{ flex: 1 }}
                    start={[0.8, 0]}
                    end={[1, 0]}
                  />
              )}
              >
                {renderTags(props.tags)}
              </MaskedView>
            </View>
            <View style={styles.topbarViewLimit}>
              <Text style={[styles.topbarViewLimitText, { display: props.archive ? 'none' : 'flex' }]}>
                {props.currentViews !== undefined ? props.viewLimit - props.currentViews : 'nan'}
                /
                {props.viewLimit !== undefined ? props.viewLimit : 'nan'}
              </Text>
            </View>
          </View>
          <View style={styles.body}>
            <Text style={styles.bodyContent}>
              {props.caption}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    marginVertical: '1%',
    marginHorizontal: '5%',
    backgroundColor: 'black',
    borderRadius: 10,
  },
  subcontainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: windowHeight * 0.25,
  },

  topbar: {
    height: '20%',
    width: '100%',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  topbarTags: {
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    marginLeft: '1%',
  },
  tagWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: '3%',
  },
  topbarMaskedView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  topbarTagItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    opacity: 0.7,
    borderRadius: 5,
    marginRight: 5,
    paddingLeft: 3,
    paddingRight: 3,
    alignSelf: 'center',
  },
  topbarTagItemText: {
    color: 'black',
    textAlign: 'center',
  },

  topbarAuthor: {
    marginLeft: '2%',
  },

  topbarViewLimit: {
    marginRight: '2%',
    marginLeft: '2%',
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
