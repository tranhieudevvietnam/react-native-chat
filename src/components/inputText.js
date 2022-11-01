import {TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {
  ColorBorder,
  ColorWhite,
  ColorTextHint,
  ColorText,
} from '../constants/color';

const InputTextComponent = ({value, onChange, placeholder, keyboardType}) => {
  return (
    <TextInput
      style={styles.input}
      onChangeText={onChange}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={ColorTextHint}
      keyboardType={keyboardType}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    backgroundColor: ColorWhite,
    borderRadius: 20,
    marginVertical: 10,
    borderColor: ColorBorder,
    color: ColorText,
    padding: 10,
  },
});

export default InputTextComponent;
