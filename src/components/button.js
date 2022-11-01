import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {ColorMain, ColorWhite} from '../constants/color';

const ButtonComponent = ({title, onTap, styleButton, styleText}) => {
  return (
    <TouchableOpacity style={[styleButton, styles.container]} onPress={onTap}>
      <Text style={[styleText, styles.text]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorMain,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 15,
    paddingBottom: 15,
    marginVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  text: {color: ColorWhite, fontWeight: 'bold'},
});

export default ButtonComponent;
