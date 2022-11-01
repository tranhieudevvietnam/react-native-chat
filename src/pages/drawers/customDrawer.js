/* eslint-disable react-native/no-inline-styles */
import {View, Text, Animated, Dimensions, SafeAreaView} from 'react-native';
import React from 'react';
import {ColorText, ColorWhite} from '../../constants/color';
import HomeScreen from '../home/homeScreen';
import DrawerContent from './drawerContent';
const {width, height} = Dimensions.get('window');

const CustomDrawer = () => {
  const [showMenu, setShowMenu] = React.useState(false);
  //Animation properties....
  const offSetValue = React.useRef(new Animated.Value(0)).current;
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  return (
    <View style={{backgroundColor: ColorWhite, flex: 1}}>
      <DrawerContent />
      <Animated.View
        style={{
          flex: 1,
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          position: 'absolute',
          transform: [{scale: scaleValue}, {translateX: offSetValue}],
        }}>
        <HomeScreen
          showMenu={showMenu}
          homeStyle={{
            borderTopLeftRadius: showMenu ? 20 : 0,
            borderTopRightRadius: showMenu ? 20 : 0,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
          onTapMenu={() => {
            Animated.timing(scaleValue, {
              toValue: showMenu ? 1 : 0.88,
              duration: 100,
              useNativeDriver: true,
            }).start();
            Animated.timing(offSetValue, {
              toValue: showMenu ? 0 : width / 1.5,
              duration: 300,
              useNativeDriver: true,
            }).start();

            setShowMenu(!showMenu);
          }}
        />
      </Animated.View>
    </View>
  );
};

const HomeTemp = () => {
  return <Text style={{color: ColorText}}>Home Temp</Text>;
};

export default CustomDrawer;
