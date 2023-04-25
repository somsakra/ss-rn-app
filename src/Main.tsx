import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';

const Stack = createNativeStackNavigator<RouteStackParamList>();

type RouteStackParamList = {
  Home: undefined;
  Detail: {name: string};
};

function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Home"
          options={{title: 'My home'}}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Detail"
          options={{title: 'Detail'}}
          component={DetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Main;
