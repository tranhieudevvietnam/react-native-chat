import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createUser,
  getAllUser,
  getOneUser,
} from '../firebases/firebaseDatabase';

async function addUserToChat({fullNameString, phoneString}) {
  await AsyncStorage.setItem('@phone', phoneString);
  // const resultOneUser = await getOneUser({
  //   phoneString: phoneString,
  // });
  // if (resultOneUser === null) {
  const deviceTokenString = await AsyncStorage.getItem('@deviceToken');
  await AsyncStorage.setItem('@fullName', fullNameString);
  await createUser({
    fullNameString: fullNameString,
    phoneString: phoneString,
    deviceTokenString: deviceTokenString,
  });
  // } else {
  //   await AsyncStorage.setItem('@fullName', fullNameString);
  // }
  return true;
}

async function getAllUsers() {
  const currentPhone = await AsyncStorage.getItem('@phone');
  let dataResult = await getAllUser({currentPhone: currentPhone});
  return dataResult;
}

async function getOneUserByPhone({phoneString}) {
  const resultOneUser = await getOneUser({
    phoneString: phoneString,
  });
  console.log('getOneUserCurrent', resultOneUser);
  return resultOneUser;
}

export default {addUserToChat, getAllUsers, getOneUserByPhone};
