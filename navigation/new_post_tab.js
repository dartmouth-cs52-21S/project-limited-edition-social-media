import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import NewPostCamera from '../components/camera';
import NewPost from '../components/newpost';
import FieldViewer from '../components/fieldViewer';

const Stack = createStackNavigator();

const NewPostTab = () => {
  return (
    <Stack.Navigator initialRouteName="Camera">
      <Stack.Screen name="Camera"
        component={NewPostCamera}
        options={{
          headerShown: false,
          gestureDirection: 'horizontal-inverted',
        }}
      />
      <Stack.Screen name="New Post"
        component={NewPost}
        options={({ navigation, route }) => ({
          headerLeft: (props) => (
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() => {
                navigation.goBack();
                // need to call replace here to remount camera because
                // the camera flip does not work after you record a video
                // I think it's a bug in expo-camera but good chance I just
                // messed up somewhere in camera.js
                navigation.replace('Camera');
              }}
            >
              <Icon name="chevron-back-outline" type="ionicon" color="rgb(0,0,0)" />
              <Text>Camera</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="Edit Field"
        component={FieldViewer}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default NewPostTab;
