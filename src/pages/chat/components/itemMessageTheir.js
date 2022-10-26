/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {ColorText, ColorBorder} from '../../../constants/color';
import Avatar from '../../../components/avatar';
import messageModel from '../../../models/messageModel';

const ItemMessageTheir = ({item = messageModel, onLongPress}) => {
  return (
    <TouchableOpacity style={{marginBottom: 10}} onLongPress={onLongPress}>
      <View style={styles.container}>
        <Avatar style={styles.avatar} />
        <View style={styles.containerMessage}>
          <Text style={styles.textMessage}>{item.message}</Text>
        </View>
      </View>
      <Text style={styles.textTime}>{item.time}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  containerMessage: {
    padding: 15,
    backgroundColor: ColorBorder,
    borderRadius: 15,
    marginLeft: 10,
  },
  avatar: {
    width: 35,
    height: 35,
  },
  textMessage: {
    color: ColorText,
    fontSize: 16,
  },
  textTime: {
    marginLeft: 10 + 35, // 35 (width: 35, height: 35) of avatar, 10 of containerMessage (marginLeft: 10)
    fontSize: 12,
    color: ColorText,
  },
});

export default ItemMessageTheir;
