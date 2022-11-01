import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ColorMain} from '../constants/color';
import StatusBarCustom from './statusBarCustom';
import {getStatusBarHeight} from 'react-native-status-bar-height';

// const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const STATUSBAR_HEIGHT = getStatusBarHeight();

//child is function return widget child
const AppBar = props => {
  return (
    <View style={[styles.containerAppBar, props.style]}>
      <StatusBarCustom
        backgroundColor="#0000"
        barStyle={props.showMenu ? 'dark-content' : 'light-content'}
      />
      {props.children}
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
