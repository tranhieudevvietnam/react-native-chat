import React from 'react';

import {View, SafeAreaView, StatusBar, StyleSheet} from 'react-native';

const StatusBarCustom = ({backgroundColor, ...props}) => (
  <StatusBar translucent backgroundColor={backgroundColor} {...props} />
);

export default StatusBarCustom;
