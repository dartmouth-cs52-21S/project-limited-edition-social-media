import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Camera from '../components/camera';
import NewPost from '../components/newpost';
import FieldViewer from '../components/fieldViewer';

const Stack = createStackNavigator();

const NewPostTab = () => {
  return (
    <Stack.Navigator initialRouteName="Camera">
      <Stack.Screen name="Camera"
        component={Camera}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="New Post" component={NewPost} />
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
