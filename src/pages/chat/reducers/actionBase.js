import {
  FETCHING_DATA,
  FETCHING_DATA_SUCCESS,
  FETCHING_DATA_INSERT_SUCCESS,
  FETCHING_DATA_FAILURE,
  FETCHING_DATA_HISTORY_SUCCESS,
  FETCHING_DATA_DEVICE_TOKEN_SUCCESS,
} from './constants';
//#region FETCHING function
export function getData() {
  return {
    type: FETCHING_DATA,
    data: [],
  };
}

export function getDataSuccess({data}) {
  return {
    type: FETCHING_DATA_SUCCESS,
    data: data,
  };
}
export function getDataInsertSuccess({data}) {
  return {
    type: FETCHING_DATA_INSERT_SUCCESS,
    data: data,
  };
}
export function getDataDeviceTokenSuccess({data}) {
  return {
    type: FETCHING_DATA_DEVICE_TOKEN_SUCCESS,
    data: data,
  };
}
export function getDataHistorySuccess({data}) {
  return {
    type: FETCHING_DATA_HISTORY_SUCCESS,
    data: data,
  };
}

export function getDataFailure({messageErrorString}) {
  return {
    type: FETCHING_DATA_FAILURE,
    data: {
      message: messageErrorString,
    },
  };
}
//#endregion
