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
const sendNotification = async ({data}) => {
  // await admin.messaging().sendToDevice(
  //   [], // device fcm tokens...
  //   {
  //     data: {
  //       // owner: JSON.stringify(owner),
  //       // user: JSON.stringify(user),
  //       // picture: JSON.stringify(picture),
  //     },
  //   },
  //   {
  //     // Required for background/quit data-only messages on iOS
  //     contentAvailable: true,
  //     // Required for background/quit data-only messages on Android
  //     priority: 'high',
  //   },
  // );
};

export {getDeviceToken, sendNotification};
