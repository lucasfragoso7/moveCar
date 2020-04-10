import React, { Component , Fragment} from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import MapView from '../Map';

const Drawer = createDrawerNavigator();
export default class Navigation extends Component {
  render() {
    return (
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="MAP">
            <Drawer.Screen name="MAP" component={MapView} />
          </Drawer.Navigator>
        </NavigationContainer>
      );
  }
}
