import {
  getDataSuccess,
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
    console.log('dataxxxx', dataResult);
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
    console.log('onMessages-senderPhoneString', senderPhoneString);
    console.log('onMessages-phoneString', phoneString);

    const dataHistory = await MessageUseCase.getOneHistory({
      senderPhoneString: senderPhoneString,
      phoneString: phoneString,
    });
    console.log('onMessages-dataHistory', dataHistory);
    if (dataHistory !== null) {
      const historyId = Object.keys(dataHistory)[0];
      console.log('onMessages-dataHistory', historyId);
      dispatch(
        getDataHistorySuccess({
          data: historyId,
        }),
      );
      MessageUseCase.onMessageChat({
        historyId: historyId,
        onMessageChange: data => {
          dispatch(getDataSuccess({data: data}));
        },
      });
    }
  };
}
export function getOneUserByPhone({phoneString}) {
  return async dispatch => {
    dispatch(getData());
    const data = await UserUseCase.getOneUserByPhone({
      phoneString: phoneString,
    });
    dispatch(getDataDeviceTokenSuccess({data: data.deviceToken}));
  };
}
