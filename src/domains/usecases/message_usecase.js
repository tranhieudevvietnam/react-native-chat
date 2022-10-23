import {
  onMessages,
  sendMessage,
  createHistory,
  getOneHistoryByPhone,
  getAllHistory,
} from '../firebases/firebaseDatabase';
import {TABLE_MESSAGE} from '../../constants/constants';

async function sendMessageChat({
  fullNameString,
  senderPhoneString,
  phoneString,
  messageString,
  historyId,
}) {
  let historyIdResult = historyId;

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
        phoneString: phoneString,
        contentString: messageString,
      });
    }
  } else {
    await sendMessage({
      historyId: historyId,
      fullNameString: fullNameString,
      senderPhoneString: senderPhoneString,
      phoneString: phoneString,
      messageString: messageString,
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
  const dataHistory = await getAllHistory();
  return dataHistory;
}

export default {sendMessageChat, onMessageChat, getOneHistory, getAllHistories};
