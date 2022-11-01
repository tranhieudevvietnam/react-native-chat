/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, Image} from 'react-native';
import * as React from 'react';
import {StackActions} from '@react-navigation/native';

import {ColorMain} from '../../constants/color';
import Loading from '../../components/loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WellComeScreen = ({navigation}) => {
  React.useEffect(() => {
    new Promise(resolve => setTimeout(resolve, 3000)).then(() => {
      checkInitScreen();
    });
  }, []);
  // React.useEffect(() => {
  //   if (isLogin === true) {
  //   } else {
  //   }
  // }, [isLogin]);

  const checkInitScreen = async () => {
    const phoneCurrent = await AsyncStorage.getItem('@phone');
    if (phoneCurrent?.length > 0) {
      navigation.dispatch(StackActions.replace('HomeScreen'));
    } else {
      navigation.dispatch(StackActions.replace('LoginScreen'));
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{uri: 'https://reactjs.org/logo-og.png'}}
        style={[styles.containerImage]}
      />
      <Loading isFetching={true} color={'white'} />
      <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 30}}>
        WellCome Screen
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorMain,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerImage: {
    borderRadius: 10,
    width: 100,
    height: 100,
    marginBottom: 100,
  },
});

export default WellComeScreen;
