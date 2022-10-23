import {getData, getDataSuccess} from './actionBase';
import message_usecase from '../../../../domains/usecases/message_usecase';

export function getAllHistory() {
  return async dispatch => {
    dispatch(getData());
    const dataResult = await message_usecase.getAllHistories();
    dispatch(
      getDataSuccess({
        data: dataResult,
      }),
    );
  };
}
