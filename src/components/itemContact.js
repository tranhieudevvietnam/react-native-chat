/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  ColorMain,
  ColorText,
  ColorTextHint,
  ColorWhile,
} from '../constants/color';
import Avatar from './avatar';
import userModel from '../models/userModel';

const ItemContact = ({item = userModel, onPress}) => {
  // console.log('Message', item);
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.containerRow}>
        <Avatar />
        <View style={[styles.containerRow2]}>
          <View style={{justifyContent: 'space-between', flex: 1}}>
            <Text style={styles.itemTitle}>{item.fullName}</Text>
            <Text numberOfLines={1} style={styles.itemSub}>
              {item.phone}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  containerRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingLeft: 10,
  },
  containerCount: {
    backgroundColor: ColorMain,
    borderRadius: 100,
    margin: 5,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTime: {
    color: ColorWhile,
    fontSize: 12,
    fontWeight: 'bold',
  },
  time: {
    color: ColorText,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: ColorText,
  },
  itemSub: {
    color: ColorTextHint,
  },
});

export default ItemContact;
