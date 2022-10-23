import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createUser,
  getAllUser,
  getOneUser,
} from '../firebases/firebaseDatabase';

// async function addUserToChat({fullNameString, phone}) {
//   const pathString = TABLE_USER;
//   await AsyncStorage.setItem('@phone', phone);
//   console.log('xxxx');

//   const dataResult = await onceData({
//     pathString: pathString + '/' + phone,
//   });
//   console.log('dataResult:', dataResult);
//   if (dataResult === null) {
//     await AsyncStorage.setItem('@fullName', fullNameString);
//     setData({
//       pathString: TABLE_USER + '/' + phone,
//       dataJson: {
//         phone: phone,
//         fullName: fullNameString,
//       },
//     });
//   } else {
//     await AsyncStorage.setItem('@fullName', dataResult.fullName);
//   }
//   return true;
// }

// async function getAllUsers() {
//   try {
//     const pathString = TABLE_USER;
//     let dataResult = await getAllData({
//       pathString: pathString,
//     });
//     return dataResult;
//   } catch (error) {
//     console.log('error:', error);
//     return {};
//   }
// }

async function addUserToChat({fullNameString, phoneString}) {
  await AsyncStorage.setItem('@phone', phoneString);
  const resultOneUser = await getOneUser({
    phoneString: phoneString,
  });
  if (resultOneUser === null) {
    await AsyncStorage.setItem('@fullName', fullNameString);
    const resultCreateUser = await createUser({
      fullNameString: fullNameString,
      phoneString: phoneString,
    });
    console.log('resultCreateUser', resultCreateUser);
  } else {
    await AsyncStorage.setItem('@fullName', fullNameString);
  }
  return true;
}

async function getAllUsers() {
  let dataResult = await getAllUser();
  return dataResult;
}

export default {addUserToChat, getAllUsers};
