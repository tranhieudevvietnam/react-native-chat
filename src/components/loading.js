import {ActivityIndicator} from 'react-native';
import React from 'react';

const Loading = ({isFetching = false}) => {
  if (isFetching === true) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  } else {
    return null;
  }
};

export default Loading;
