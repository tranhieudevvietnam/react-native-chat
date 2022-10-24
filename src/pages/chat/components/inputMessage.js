/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  ColorBorder,
  ColorTextHint,
  ColorMain,
  ColorText,
} from '../../../constants/color';
import {sendMessage} from '../reducers/actions';
import {useDispatch} from 'react-redux';

const InputMessage = ({
  historyId,
  phoneString,
  fullNameString,
  deviceTokenString,
}) => {
  const [valueMessage, onChangeText] = React.useState('');
  const dispatch = useDispatch();

  const onSendMessage = async () => {
    dispatch(
      sendMessage({
        historyId: historyId,
        phoneString: phoneString,
        fullNameString: fullNameString,
        messageString: valueMessage,
        deviceTokenString: deviceTokenString,
      }),
    );
    onChangeText('');
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <TextInput
          value={valueMessage}
          onChangeText={value => onChangeText(value)}
          placeholder="Type your message"
          placeholderTextColor={ColorTextHint}
          style={styles.textInput}
        />
      </View>
      <TouchableOpacity style={styles.buttonSend} onPress={onSendMessage}>
        <Image
          source={require('../../../../assets/icons/icon_send.png')}
          style={styles.iconSend}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: ColorBorder,
    borderRadius: 20,
  },
  iconSend: {
    width: 19,
    height: 19,
  },
  buttonSend: {
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: ColorMain,
  },
  textInput: {
    color: ColorText,
  },
});

export default InputMessage;
