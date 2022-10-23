import {StyleSheet, Image} from 'react-native';
import React from 'react';

const Avatar = ({uri, style}) => {
  return (
    <Image
      source={{uri: uri != null ? uri : 'https://reactjs.org/logo-og.png'}}
      style={[styles.containerImage, style]}
    />
  );
};

const styles = StyleSheet.create({
  containerImage: {
    borderRadius: 10,
    width: 50,
    height: 50,
  },
});

export default Avatar;
