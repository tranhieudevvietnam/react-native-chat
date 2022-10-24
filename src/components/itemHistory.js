/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  ColorMain,
  ColorText,
  ColorTextHint,
  ColorWhile,
} from '../constants/color';
import {convertDateTime} from '../utils/mometUtils';
import Avatar from './avatar';
import {historyModel} from '../models/historyModel';

const ItemHistory = ({item = historyModel, onPress}) => {
  // console.log('Message', item);
  const itemData = Object.values(item)[0];
  const historyId = Object.keys(item)[0];

  return (
    <TouchableOpacity onPress={() => onPress(historyId, itemData)}>
      <View style={styles.containerRow}>
        <Avatar />
        <View style={[styles.containerRow2]}>
          <View style={{justifyContent: 'space-between', flex: 1}}>
            <Text style={styles.itemTitle}>{itemData.fullName}</Text>
            <Text numberOfLines={1} style={styles.itemSub}>
              {itemData.content}
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.time}>{itemData.time}</Text>
            <View style={styles.containerCount}>
              <Text style={styles.textTime}>{10}</Text>
            </View>
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
    color: ColorMain,
  },
  itemSub: {
    color: ColorTextHint,
  },
});

export default ItemHistory;
