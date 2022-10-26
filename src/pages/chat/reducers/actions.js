import {
  getDataSuccess,
  getDataInsertSuccess,
  getDataHistorySuccess,
  getData,
  getDataDeviceTokenSuccess,
} from './actionBase';
import MessageUseCase from '../../../domains/usecases/message_usecase';
import UserUseCase from '../../../domains/usecases/user_usecase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function sendMessage({
  historyId,
  phoneString,
  fullNameString,
  messageString,
  deviceTokenString,
}) {
  return async dispatch => {
    const phoneCurrent = await AsyncStorage.getItem('@phone');

    const dataResult = await MessageUseCase.sendMessageChat({
      fullNameString: fullNameString,
      senderPhoneString: phoneCurrent,
      phoneString: phoneString,
      messageString: messageString,
      historyId: historyId,
      deviceTokenString: deviceTokenString,
    });
    if (dataResult !== null) {
      dispatch(
        getDataHistorySuccess({
          data: dataResult,
        }),
      );
    }
  };
}
export function onMessages({phoneString, senderPhoneString}) {
  return async dispatch => {
    dispatch(getData());
    // console.log('onMessages-senderPhoneString', senderPhoneString);
    // console.log('onMessages-phoneString', phoneString);

    const dataHistory = await MessageUseCase.getOneHistory({
      senderPhoneString: senderPhoneString,
      phoneString: phoneString,
    });
    if (dataHistory !== null) {
      const historyId = Object.keys(dataHistory)[0];
      dispatch(
        getDataHistorySuccess({
          data: historyId,
        }),
      );
      MessageUseCase.onMessageChat({
        historyId: historyId,
        onMessageChange: data => {
          dispatch(getDataInsertSuccess({data: data}));
        },
      });
    }
  };
}

export function getAllMessages({index, historyId}) {
  return async dispatch => {
    dispatch(getData());
    const data = await MessageUseCase.getAllMessageByLimit({
      index: index,
      historyId: historyId,
    });
    dispatch(getDataSuccess({data: data}));
    // console.log('getOneUserByPhone', data);
  };
}

export function getOneUserByPhone({phoneString}) {
  return async dispatch => {
    dispatch(getData());
    const data = await UserUseCase.getOneUserByPhone({
      phoneString: phoneString,
    });
    // console.log('getOneUserByPhone', data);
    dispatch(getDataDeviceTokenSuccess({data: data.deviceToken}));
  };
}
