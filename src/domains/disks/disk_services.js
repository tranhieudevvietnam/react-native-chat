import AsyncStorage from '@react-native-async-storage/async-storage';
import userModel from '../../models/userModel';

const setUserCurrent = async ({user = userModel}) => {
  try {
    await AsyncStorage.setItem('@user', user);
    console.log('setUserCurrent done!');
  } catch (error) {
    console.warn(error);
  }
};

const setDeviceToken = async ({deviceToken = ''}) => {
  try {
    await AsyncStorage.setItem('@device_token', deviceToken);
    console.log('setDeviceToken done!');
  } catch (error) {
    console.warn(error);
  }
};

const getUserCurrent = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@user');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.warn(error);
  }
};
const getDeviceToken = async () => {
  try {
    const value = await AsyncStorage.getItem('@device_token');
    return value;
  } catch (error) {
    console.warn(error);
  }
};

export {getUserCurrent, getDeviceToken, setUserCurrent, setDeviceToken};
