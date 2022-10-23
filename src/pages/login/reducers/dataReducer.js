import {
  FETCHING_DATA,
  FETCHING_DATA_SUCCESS,
  FETCHING_DATA_FAILURE,
} from './constants.js';

const initialState = {
  isFetched: false,
  isFetching: false,
  error: false,
};

function dataReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_DATA:
      return {
        ...state,
        isFetching: true,
      };
    case FETCHING_DATA_SUCCESS:
      // console.log(FETCHING_DATA_SUCCESS, action.data);
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        loginData: action.data,
      };
    case FETCHING_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        loginData: action.data,
      };
    default:
      return state;
  }
}
export default dataReducer;
