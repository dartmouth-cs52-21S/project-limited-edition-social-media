import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Text, StyleSheet, View, TouchableOpacity, Image,
} from 'react-native';
import { connect } from 'react-redux';
import Archive from '../components/archive';

const ModalStack = createStackNavigator();

const ArchiveTab = (props) => (
  <ModalStack.Navigator mode="modal">
    <ModalStack.Screen name="Archive"
      component={Archive}
      options={({ navigation, route }) => ({
        headerLeft: () => (
          <View style={[styles.container, { marginLeft: 15 }]}>
            <Text style={styles.text}>Poof</Text>
          </View>
        ),
        headerTitle: () => (
          <View style={[styles.container]}>
            <Text style={[styles.text, { fontFamily: 'Gill Sans' }]}>Archive</Text>
          </View>
        ),
        headerRight: () => (
          <View style={styles.rightHeader}>
            <TouchableOpacity
              style={styles.container}
              onPress={() => {
                navigation.navigate('Profile');
              }}
            >
              <Image style={styles.image} source={{ uri: props.user.profilePic || 'https://i.pinimg.com/236x/02/6a/cc/026acca08fb7beea6bd4ecd430e312bd.jpg' }} />
            </TouchableOpacity>
          </View>
        ),
        headerStyle: { backgroundColor: 'rgb(89,84,87)' },
      })}
    />
  </ModalStack.Navigator>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  text: {
    color: 'rgb(255,255,255)',
    fontSize: 40,
    paddingBottom: 60,
    fontWeight: '500',
    fontFamily: 'ZhiMangXing_400Regular',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 15,
    marginLeft: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
  },
});

const mapStateToProps = ({ user }) => (
  {
    user,
  }
);

export default connect(mapStateToProps, null)(ArchiveTab);
