import firebase from './firebaseConfig';
// import Moment from 'moment';
import {
  TABLE_USER,
  TABLE_MESSAGE,
  TABLE_HISTORY,
} from '../../constants/constants';
import moment from 'moment';
import {sendNotification} from '../services/messageService';

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

const createUser = async ({fullNameString, phoneString, deviceTokenString}) => {
  const pathString = TABLE_USER;
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
  // console.log('createUser updated!', data.val());
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

const getAllUser = async ({currentPhone}) => {
  const pathString = TABLE_USER;
  const data = await firebase.database().ref(pathString).once('value');
  const listData = Object.values(data.val());
  const listUsers = [];
  listData.forEach(item => {
    if (item.phone !== currentPhone) {
      listUsers.push(item);
    }
  });
  return listUsers;
};

const getAllHistory = async ({currentPhone}) => {
  const pathString = TABLE_HISTORY;
  const dataCurrent = await firebase
    .database()
    .ref(pathString)
    .child(currentPhone)
    .once('value');

  const data = await firebase.database().ref(pathString).once('value');

  // console.log('getAllHistory:', data.val());
  // console.log('getAllHistory - current:', dataCurrent.val());
  // console.log('getAllHistory - current:', listDataCurrent);

  // Object.values(data.val()).forEach(item => {
  //   console.log('item', item);
  // });

  const listDataCurrent =
    dataCurrent.val() !== null ? Object.values(dataCurrent.val()) : [];
  const listHistory = [];

  if (data.val() !== null) {
    Object.values(data.val()).forEach(item => {
      if (item[currentPhone] !== undefined) {
        listHistory.push(item[currentPhone]);
      }
    });
  }

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
  senderFullName,
  senderPhoneString,
  contentString,
  deviceTokenString,
}) => {
  var todayDate = moment();

  const dataHistoryCurrent = await firebase
    .database()
    .ref(pathString)
    .child(senderPhoneString)
    .child(phoneString)
    .once('value');
  console.log('dataHistoryCurrent', dataHistoryCurrent.val());
  const dataHistoryCurrent2 = await firebase
    .database()
    .ref(pathString)
    .child(phoneString)
    .child(senderPhoneString)
    .once('value');
  console.log('dataHistoryCurrent2', dataHistoryCurrent2.val());

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
    deviceTokenString: deviceTokenString,
    senderFullName: senderFullName,
  });
  return data.key;
};

const getOneHistoryByPhone = async ({phoneString, senderPhoneString}) => {
  const pathString = TABLE_HISTORY;
  const dataCurrent = await firebase
    .database()
    .ref(pathString)
    .child(senderPhoneString)
    .child(phoneString)
    .once('value');

  const data = await firebase
    .database()
    .ref(pathString)
    .child(phoneString)
    .child(senderPhoneString)
    .once('value');

  // console.log('getOneHistoryByPhone - phoneString:', phoneString);
  // console.log('getOneHistoryByPhone - senderPhoneString:', senderPhoneString);
  // console.log('getOneHistoryByPhone - data:', data.val());
  // console.log('getOneHistoryByPhone -  dataCurrent:', dataCurrent.val());
  if (dataCurrent.val() !== null) {
    return dataCurrent.val();
  } else {
    return data.val();
  }
};

const sendMessage = async ({
  historyId,
  fullNameString,
  senderFullName,
  senderPhoneString,
  phoneString,
  messageString,
  deviceTokenString,
}) => {
  var todayDate = moment();
  const pathString = TABLE_MESSAGE;

  sendNotification({
    deviceTokenString: deviceTokenString,
    messageString: messageString,
    fullNameString: senderFullName,
  });

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
