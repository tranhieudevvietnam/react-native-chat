/* eslint-disable react-native/no-inline-styles */
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Avatar from '../../components/avatar';
import {ColorText} from '../../constants/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ColorMain} from '../../constants/color';

const STATUSBAR_HEIGHT = getStatusBarHeight();

const DrawerContent = () => {
  const [user, setUser] = React.useState({
    fullName: '',
    phone: '',
  });

  React.useEffect(() => {
    getDataLocal();
  }, []);

  const getDataLocal = async () => {
    const valueFullName = await AsyncStorage.getItem('@fullName');
    const valuePhone = await AsyncStorage.getItem('@phone');
    setUser({
      fullName: valueFullName,
      phone: valuePhone,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerTitleRow}>
        <Avatar style={{width: 50, height: 50}} />
        <View style={{marginLeft: 10}}>
          <Text style={{color: ColorMain, fontWeight: 'bold', fontSize: 20}}>
            {user.fullName}
          </Text>
          <Text style={{color: ColorText, marginTop: 5}}>{user.phone}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: STATUSBAR_HEIGHT + 30,
    height: '100%',
    width: '60%',
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  containerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: ColorMain,
  },
});

export default DrawerContent;
