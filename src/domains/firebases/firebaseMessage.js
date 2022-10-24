import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getDeviceToken() {
  // // Register the device with FCM
  // await messaging().registerDeviceForRemoteMessages();
  // Get the token
  const token = await messaging().getToken();
  console.log('device token', token);
  // Save the token in data local
  await AsyncStorage.setItem('@deviceToken', token);
}

export {getDeviceToken};
