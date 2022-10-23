import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from 'react-native';
import React from 'react';

const ViewCustom = ({child}) => {
  return (
    <KeyboardAvoidingView
      // eslint-disable-next-line react-native/no-inline-styles
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      {child}
      {/* </TouchableWithoutFeedback> */}
    </KeyboardAvoidingView>
  );
};

export default ViewCustom;
