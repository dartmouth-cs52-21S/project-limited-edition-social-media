import React from 'react';
import {
  StyleSheet, View, Text, ImageBackground, Dimensions, TouchableOpacity,
} from 'react-native';
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

const PostMinimized = (props) => {
  const navigation = useNavigation();
  const rarity = computeRarity(props.viewLimit);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('PostFullScreen', props)}
    >
      <ImageBackground
        source={{ uri: props.content }}
        style={{ ...styles.contentImage, borderColor: rarity, borderWidth: 5 }}
        blurRadius={parseInt(props.blur, 10) || 0}
      >
        <View style={styles.subcontainer}>
          <View style={styles.topbar}>
            <View style={styles.topbarAuthor}>
              <Text style={styles.font}>
                {props.displayName ? props.displayName : 'author'}
              </Text>
            </View>
            <View style={styles.topbarTags}>
              {props.tags.map((tag) => {
                return (
                  <View style={styles.topbarTagItem} key={tag}>
                    <Text style={styles.topbarTagItemText}>
                      #
                      {tag}
                    </Text>
                  </View>
                );
              })}
            </View>
            <View style={styles.topbarViewLimit}>
              <Text style={styles.topbarViewLimitText}>
                {props.currentViews !== undefined ? props.viewLimit - props.currentViews : 'nan'}
                /
                {props.viewLimit !== undefined ? props.viewLimit : 'nan'}
              </Text>
            </View>
          </View>
          <View style={styles.body}>
            <Text style={styles.bodyContent}>
              {props.caption ? props.caption : 'NO CAPTION'}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const renderPostMinimizedItem = (props) => {
  return (
    <PostMinimized
      caption={props.item.caption}
      preview={props.item.preview}
      content={props.item.content}
      displayName={props.item.author.displayname}
      currentViews={props.item.currentViews}
      viewLimit={props.item.viewLimit}
      blur={props.item.coverBlur}
      tags={props.item.hashtags}
      type={props.item.type}
    />
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: '5%',
  },
  topbarTagItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    opacity: 0.7,
    borderRadius: 5,
    marginLeft: '1%',
    marginRight: '1%',
  },
  topbarTagItemText: {
    color: 'black',
    textAlign: 'center',
    paddingLeft: '1%',
    paddingRight: '1%',
  },

  topbarAuthor: {
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

export { PostMinimized, renderPostMinimizedItem };
