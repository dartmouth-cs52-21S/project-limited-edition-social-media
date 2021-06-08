import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Text, StyleSheet, View, TouchableOpacity, Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import AllPosts from '../components/all_posts';

const ModalStack = createStackNavigator();

const Home = (props) => (
  <ModalStack.Navigator mode="modal">
    <ModalStack.Screen name="AllPosts"
      component={AllPosts}
      options={({ navigation, route }) => ({
        headerLeft: () => (
          <View style={[styles.container, { marginLeft: 15 }]}>
            <Text style={styles.text}>Poof</Text>
          </View>
        ),
        headerTitle: () => (
          <View />
          // <TouchableOpacity style={[styles.container, { marginBottom: 18 }]}
          //   onPress={() => {
          //     navigation.navigate('Post');
          //   }}
          // >
          //   <MaterialCommunityIcons name="plus-circle"
          //     color="#FFFBFC"
          //     size={35}
          //   />
          // </TouchableOpacity>
        ),
        headerRight: () => (
          <View style={styles.rightHeader}>
            <TouchableOpacity style={[styles.container, { marginBottom: 18 }]}
              onPress={() => {
                navigation.navigate('Post');
              }}
            >
              <MaterialCommunityIcons name="plus-circle"
                color="#468189"
                size={30}
              />
            </TouchableOpacity>
          </View>
        ),
        headerStyle: { backgroundColor: '#FFFBFC' },
      })}
    />
  </ModalStack.Navigator>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginRight: 12,
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    // backgroundColor: 'pink',
  },
  text: {
    color: '#468189',
    fontSize: 40,
    paddingBottom: 60,
    fontWeight: '500',
    fontFamily: 'ZhiMangXing_400Regular',
    // textShadowColor: 'rgba(0,0,0,0.5)',
    // textShadowOffset: { width: 2, height: 2 },
    // textShadowRadius: 4,
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

export default connect(mapStateToProps, null)(Home);
