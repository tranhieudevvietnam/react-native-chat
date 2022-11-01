import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {ColorMain, ColorText, ColorWhite} from '../../../constants/color';
import Avatar from '../../../components/avatar';
import messageModel from '../../../models/messageModel';

const ItemMessageMine = ({item = messageModel, onLongPress}) => {
  return (
    <TouchableOpacity onLongPress={onLongPress}>
      <View style={styles.container}>
        <View style={styles.containerMessage}>
          <Text style={styles.textMessage}>{item.message}</Text>
        </View>

        <Avatar style={styles.avatar} />
      </View>
      <Text style={styles.textTime}>{item.time}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // marginLeft: '30%',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  containerMessage: {
    padding: 15,
    backgroundColor: ColorMain,
    borderRadius: 15,
  },
  avatar: {
    width: 35,
    height: 35,
    marginLeft: 10,
  },
  textMessage: {
    color: ColorWhite,
    fontSize: 16,
  },
  textTime: {
    fontSize: 12,
    color: ColorText,
    textAlign: 'right',
    marginRight: 35 + 10, // 35 (width: 35, height: 35) of avatar, 10 of containerMessage (marginLeft: 10)
  },
});

export default ItemMessageMine;
