import {ActivityIndicator} from 'react-native';
import React from 'react';

const Loading = props => {
  if (props.isFetching === true) {
    return <ActivityIndicator size="large" color={props.color ?? '#0000ff'} />;
  } else {
    return null;
  }
};

export default Loading;
