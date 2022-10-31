/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import {ColorMain} from '../../constants/color';
import {Text} from 'react-native';
// import {createDrawerNavigator} from '@react-navigation/drawer';

// const Drawer = createDrawerNavigator();

const CustomDrawer = () => {
  return (
    <View style={{backgroundColor: ColorMain, flex: 1}}>
      {/* <Drawer.Navigator initialRouteName="HomeTemp">
        <Drawer.Screen name="HomeTemp">
          {props => <HomeTemp {...props} />}
        </Drawer.Screen>
      </Drawer.Navigator> */}
    </View>
  );
};

const HomeTemp = () => {
  return (
    <View>
      <Text>HomeTemp</Text>
    </View>
  );
};

export default CustomDrawer;
