import UserCases from '../../../domains/usecases/user_usecase';
import {getData, getDataSuccess, getDataFailure} from './actionBase';

export function createUser({fullName = '', phone = ''}) {
  return async dispatch => {
    dispatch(getData());
    if (phone.length > 0) {
      try {
        // await new Promise((resolve, reject) => {
        //   setTimeout(() => {
        //     return resolve();
        //   }, 1000);
        // });
        const data = await UserCases.addUserToChat({
          fullNameString: fullName,
          phoneString: phone,
        });
        if (data === true) {
          dispatch(getDataSuccess({data: data}));
        } else {
          dispatch(
            getDataFailure({
              messageErrorString: 'Tài khoản đã tồn tại',
            }),
          );
        }
      } catch (error) {
        dispatch(
          getDataFailure({
            messageErrorString: 'Tạo không thành công',
          }),
        );
        throw error;
      }
    } else {
      dispatch(
        getDataFailure({messageErrorString: 'Kiểm tra lại thông tin username'}),
      );
    }
  };
}
