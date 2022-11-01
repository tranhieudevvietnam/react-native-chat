/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HistoryScreen from './historys/historyScreen';
import ContactScreen from './contacts/contactScreen';
import {ColorMain, ColorWhite} from '../../constants/color';
import {TouchableOpacity, View, Text} from 'react-native';
import {ColorTextHint} from '../../constants/color';
const Tab = createBottomTabNavigator();

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // const onLongPress = () => {
        //   navigation.emit({
        //     type: 'tabLongPress',
        //     target: route.key,
        //   });
        // };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            key={label}
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: isFocused ? ColorMain : ColorWhite,
              borderRadius: 20,
              margin: 10,
              paddingVertical: 15,
            }}>
            <Text style={{color: isFocused ? ColorWhite : ColorTextHint}}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={props => {
        return <MyTabBar {...props} />;
      }}
      initialRouteName="HistoryScreen">
      <Tab.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{
          tabBarLabel: 'Lịch sử chat',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={{tabBarLabel: 'Danh bạ', headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
