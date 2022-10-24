import {
  FETCHING_DATA,
  FETCHING_DATA_SUCCESS,
  FETCHING_DATA_FAILURE,
} from './constants';
//#region FETCHING function
export function getData() {
  return {
    type: FETCHING_DATA,
  };
}

export function getDataSuccess({data}) {
  return {
    type: FETCHING_DATA_SUCCESS,
    data: data,
  };
}

export function getDataFailure({messageErrorString}) {
  return {
    type: FETCHING_DATA_FAILURE,
    data: messageErrorString,
  };
}
//#endregion
