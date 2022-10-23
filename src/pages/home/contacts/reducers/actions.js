import {getData, getDataSuccess} from './actionBase';
import UserCases from '../../../../domains/usecases/user_usecase';

export function getAllUsers() {
  return async dispatch => {
    dispatch(getData());
    const dataResult = await UserCases.getAllUsers();
    dispatch(
      getDataSuccess({
        data: dataResult,
      }),
    );
  };
}
