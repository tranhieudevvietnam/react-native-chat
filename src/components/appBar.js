import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ColorMain} from '../constants/color';
import StatusBarCustom from './statusBarCustom';
import {getStatusBarHeight} from 'react-native-status-bar-height';

// const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const STATUSBAR_HEIGHT = getStatusBarHeight();

//child is function return widget child
const AppBar = ({child}) => {
  return (
    <View style={styles.containerAppBar}>
      <StatusBarCustom backgroundColor="#0000" barStyle="light-content" />
      {child.call()}
    </View>
  );
};

const styles = StyleSheet.create({
  containerAppBar: {
    padding: 16,
    paddingTop: STATUSBAR_HEIGHT,
    backgroundColor: ColorMain,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default AppBar;
