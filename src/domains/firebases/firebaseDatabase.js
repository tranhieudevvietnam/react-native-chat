import firebase from './firebaseConfig';
// import Moment from 'moment';
import {
  TABLE_USER,
  TABLE_MESSAGE,
  TABLE_HISTORY,
} from '../../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

// async function pushData({pathString, dataJson}) {
//   await firebase.database().ref(pathString).push(dataJson);
//   console.log('pushData updated!');
// }
// async function setData({pathString, dataJson}) {
//   try {
//     // console.log('setData', dataJson);
//     await firebase.database().ref(pathString).set(dataJson);
//     let data = await onceData({pathString: pathString});
//     // console.log('pushData updated!', data);
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }
// const onceData = async ({pathString}) => {
//   console.log('pathString', pathString);
//   const dataResult = await firebase.database().ref(pathString).once('value');
//   return dataResult.val();
// };
// const getAllData = async ({pathString, currentPhone}) => {
//   console.log('getAllData pathString: ', pathString);
//   const dataResult = await firebase.database().ref(pathString).once('value');
//   return dataResult.val();
// };
const onMessages = ({historyId, onUpdateMessage}) => {
  const pathString = TABLE_MESSAGE;

  if (historyId !== undefined) {
    firebase
      .database()
      .ref(pathString)
      .child(historyId)
      .orderByChild('timestamp')
      .off('child_added');
    firebase
      .database()
      .ref(pathString)
      .child(historyId)
      .orderByChild('timestamp')
      .on('child_added', snapshot => {
        // console.log('fff', snapshot.val());
        onUpdateMessage(snapshot.val());
      });
  }
};

const createUser = async ({fullNameString, phoneString}) => {
  const pathString = TABLE_USER;
  const deviceTokenString = await AsyncStorage.getItem('@deviceToken');
  await firebase.database().ref(pathString).child(phoneString).set({
    phone: phoneString,
    fullName: fullNameString,
    deviceToken: deviceTokenString,
  });
  const data = await firebase
    .database()
    .ref(pathString)
    .child(phoneString)
    .once('value');
  console.log('createUser updated!', data.val());
  return data.val();
};

const getOneUser = async ({phoneString}) => {
  const pathString = TABLE_USER;
  const data = await firebase
    .database()
    .ref(pathString)
    .child(phoneString)
    .once('value');
  console.log('getOneUser: ', data.val());
  return data.val();
};

const getAllUser = async () => {
  const pathString = TABLE_USER;
  const data = await firebase.database().ref(pathString).once('value');
  const listData = Object.values(data.val());
  const currentPhone = await AsyncStorage.getItem('@phone');
  const listUsers = [];
  listData.forEach(item => {
    if (item.phone !== currentPhone) {
      listUsers.push(item);
    }
  });
  return listUsers;
};

const getAllHistory = async () => {
  const pathString = TABLE_HISTORY;
  const currentPhone = await AsyncStorage.getItem('@phone');
  const dataCurrent = await firebase
    .database()
    .ref(pathString)
    .child(currentPhone)
    .once('value');
  const listDataCurrent = Object.values(dataCurrent.val());
  const listHistory = [];
  // console.log('getAllHistory - current:', dataCurrent.val());
  // console.log('getAllHistory - current:', listDataCurrent);
  listDataCurrent.forEach(item => {
    if (item.phone !== currentPhone) {
      listHistory.push(item);
    }
  });
  return listHistory;
};

const createHistory = async ({
  fullNameString,
  phoneString,
  senderPhoneString,
  contentString,
}) => {
  var todayDate = moment();

  const pathString = TABLE_HISTORY;
  const data = await firebase
    .database()
    .ref(pathString)
    .child(senderPhoneString)
    .child(phoneString)
    .push({
      fullName: fullNameString,
      phone: phoneString,
      senderPhone: senderPhoneString,
      content: contentString,
      date: todayDate.format('YYYY-MM-DD'),
      time: todayDate.format('hh:mm A'),
      timestamp: todayDate.valueOf(),
    });
  sendMessage({
    historyId: data.key,
    fullNameString: fullNameString,
    phoneString: phoneString,
    senderPhoneString: senderPhoneString,
    messageString: contentString,
  });
  return data.key;
};

const getOneHistoryByPhone = async ({phoneString, senderPhoneString}) => {
  const pathString = TABLE_HISTORY;
  const data = await firebase
    .database()
    .ref(pathString)
    .child(senderPhoneString)
    .child(phoneString)
    .once('value');
  console.log('getOneHistoryByPhone', data.val());
  return data.val();
};

const sendMessage = async ({
  historyId,
  fullNameString,
  senderPhoneString,
  phoneString,
  messageString,
}) => {
  var todayDate = moment();
  const pathString = TABLE_MESSAGE;
  await firebase
    .database()
    .ref(pathString)
    .child(historyId)
    .push({
      fullName: fullNameString,
      senderPhone: senderPhoneString,
      phone: phoneString,
      message: messageString,
      date: todayDate.format('YYYY-MM-DD'),
      time: todayDate.format('hh:mm A'),
      timestamp: todayDate.valueOf(),
    });
  console.log('sendMessage updated!');
};

export {
  sendMessage,
  createUser,
  getOneUser,
  getAllUser,
  createHistory,
  onMessages,
  getOneHistoryByPhone,
  getAllHistory,
};
