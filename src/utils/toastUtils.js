import {ToastAndroid, Platform, Alert} from 'react-native';

export default function toastMessage(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    Alert.alert(msg);
  }
}
