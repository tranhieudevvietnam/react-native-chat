import {
  onMessages,
  sendMessage,
  createHistory,
  getOneHistoryByPhone,
  getAllHistory,
} from '../firebases/firebaseDatabase';
import {TABLE_MESSAGE} from '../../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function sendMessageChat({
  fullNameString,
  senderPhoneString,
  phoneString,
  messageString,
  historyId,
  deviceTokenString,
}) {
  let historyIdResult = historyId;
  const senderFullName = await AsyncStorage.getItem('@fullName');

  if (historyId === undefined) {
    const dataHistory = await getOneHistoryByPhone({
      phoneString: phoneString,
      senderPhoneString: senderPhoneString,
    });
    if (dataHistory === undefined || dataHistory === null) {
      historyIdResult = historyId;
      createHistory({
        fullNameString: fullNameString,
        senderPhoneString: senderPhoneString,
        senderFullName: senderFullName,
        phoneString: phoneString,
        contentString: messageString,
      });
    }
  } else {
    console.log('xxxxxx- sendMessage - 1: ', deviceTokenString);
    await sendMessage({
      deviceTokenString: deviceTokenString,
      historyId: historyId,
      fullNameString: fullNameString,
      senderPhoneString: senderPhoneString,
      phoneString: phoneString,
      messageString: messageString,
      senderFullName: senderFullName,
    });
  }
  return historyIdResult;
}

function onMessageChat({onMessageChange, historyId}) {
  const pathString = TABLE_MESSAGE;
  onMessages({
    historyId: historyId,
    pathString: pathString,
    onUpdateMessage: data => {
      onMessageChange(data);
    },
  });
}

async function getOneHistory({phoneString, senderPhoneString}) {
  const dataHistory = await getOneHistoryByPhone({
    phoneString: phoneString,
    senderPhoneString: senderPhoneString,
  });
  return dataHistory;
}
async function getAllHistories() {
  const currentPhone = await AsyncStorage.getItem('@phone');
  const dataHistory = await getAllHistory({currentPhone: currentPhone});
  return dataHistory;
}

export default {sendMessageChat, onMessageChat, getOneHistory, getAllHistories};
