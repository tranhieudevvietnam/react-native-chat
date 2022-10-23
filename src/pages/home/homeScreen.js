/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import Avatar from '../../components/avatar';
import AppBar from '../../components/appBar';
import BottomTabNavigation from './bottomTabNavigation';
import {Colors} from 'react-native-paper';
import {ColorWhile} from '../../constants/color';
import {NavigationContainer} from '@react-navigation/native';
// const {width, height} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: 'HomeScreen',
  //     headerShown: false,
  //   });
  // }, [navigation]);

  return (
    <View style={styles.container}>
      <AppBar
        child={() => (
          <View style={styles.containerAppBar}>
            <View style={styles.containerRow}>
              <Image
                source={require('../../../assets/icons/icon_menu.png')}
                style={styles.iconMenu}
              />
              <Text style={styles.titleAppBar}>Chat Firebase</Text>
              <Avatar style={{width: 35, height: 35}} />
            </View>
          </View>
        )}
      />
      <BottomTabNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconMenu: {
    width: 25,
    height: 12,
  },
  titleAppBar: {
    fontSize: 18,
    textAlign: 'center',
    flex: 1,
    fontWeight: 'bold',
    color: ColorWhile,
  },
});

export default HomeScreen;
