/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import Avatar from '../../components/avatar';
import AppBar from '../../components/appBar';
import BottomTabNavigation from './bottomTabNavigation';
import {ColorWhite} from '../../constants/color';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

// const {width, height} = Dimensions.get('window');

const IconComponent = props => {
  if (props.showMenu) {
    return <MaterialIcon name="close" size={30} color={'white'} />;
  } else {
    return (
      <Image
        source={require('../../../assets/icons/icon_menu.png')}
        style={styles.iconMenu}
      />
    );
  }
};

const HomeScreen = ({navigation, onTapMenu, homeStyle, showMenu}) => {
  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: 'HomeScreen',
  //     headerShown: false,
  //   });
  // }, [navigation]);

  return (
    <View
      style={[
        styles.container,
        homeStyle,
        {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
        },
      ]}>
      <AppBar style={homeStyle} showMenu={showMenu}>
        <View style={[styles.containerAppBar, homeStyle]}>
          <View style={styles.containerRow}>
            <TouchableOpacity onPress={onTapMenu} style={{padding: 10}}>
              <IconComponent showMenu={showMenu} />
            </TouchableOpacity>
            <Text style={styles.titleAppBar}>Chat Firebase</Text>
            <Avatar style={{width: 35, height: 35}} />
          </View>
        </View>
      </AppBar>
      <BottomTabNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconMenu: {
    width: 30,
    height: 15,
  },
  titleAppBar: {
    fontSize: 18,
    textAlign: 'center',
    flex: 1,
    fontWeight: 'bold',
    color: ColorWhite,
  },
});

export default HomeScreen;
