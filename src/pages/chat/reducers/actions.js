import {getDataSuccess, getDataHistorySuccess, getData} from './actionBase';
import MessageUseCase from '../../../domains/usecases/message_usecase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function createChat({phoneString, fullNameString, contentString}) {
  const phoneCurrent = await AsyncStorage.getItem('@phone');
  console.log('phoneCurrent', phoneCurrent);
  console.log('fullNameString', fullNameString);
  console.log('contentString', contentString);
  const dataResult = await MessageUseCase.createMessageChat({
    fullNameString: fullNameString,
    senderPhoneString: phoneCurrent,
    phoneString: phoneString,
    content: contentString,
  });
  // console.log('createChat', dataResult);
  return dataResult;

  // return async dispatch => {
  //   const phoneCurrent = await AsyncStorage.getItem('@phone');
  //   // dispatch(getData());
  //   console.log('phoneCurrent', phoneCurrent);

  //   // const dataResult = await MessageUseCase.createMessageChat({
  //   //   fullNameString: fullNameString,
  //   //   senderPhoneString: phoneCurrent,
  //   //   phoneString: phoneString,
  //   //   content: contentString,
  //   // });
  //   // console.log('createChat', dataResult);
  //   // dispatch(getDataSuccess({data: {}}));
  // };
}

export function sendMessage({
  historyId,
  phoneString,
  fullNameString,
  messageString,
}) {
  return async dispatch => {
    const phoneCurrent = await AsyncStorage.getItem('@phone');

    const dataResult = await MessageUseCase.sendMessageChat({
      fullNameString: fullNameString,
      senderPhoneString: phoneCurrent,
      phoneString: phoneString,
      messageString: messageString,
      historyId: historyId,
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
export function onMessages({phoneString}) {
  return async dispatch => {
    dispatch(getData());
    const phoneCurrent = await AsyncStorage.getItem('@phone');
    const dataHistory = await MessageUseCase.getOneHistory({
      senderPhoneString: phoneCurrent,
      phoneString: phoneString,
    });
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
  };
}
