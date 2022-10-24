import {
  FETCHING_DATA,
  FETCHING_DATA_SUCCESS,
  FETCHING_DATA_HISTORY_SUCCESS,
  FETCHING_DATA_FAILURE,
  FETCHING_DATA_DEVICE_TOKEN_SUCCESS,
} from './constants';

const initialState = {
  isFetched: false,
  isFetching: false,
  error: false,
  historyId: undefined,
  listMessages: [],
};

function dataReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_DATA:
      // console.log(FETCHING_DATA, action.data);
      // state.listMessages = [];
      return {
        ...state,
        isFetching: true,
        listMessages: action.data,
      };
    case FETCHING_DATA_SUCCESS:
      // console.log(FETCHING_DATA_SUCCESS, action.data.message);
      state.listMessages.unshift(action.data);
      return {
        ...state,
        isFetching: false,
        error: false,
        isFetched: true,
        listMessages: state.listMessages,
      };
    case FETCHING_DATA_DEVICE_TOKEN_SUCCESS:
      console.log(FETCHING_DATA_DEVICE_TOKEN_SUCCESS, action.data);
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        error: false,
        deviceToken: action.data,
      };
    case FETCHING_DATA_HISTORY_SUCCESS:
      console.log(FETCHING_DATA_HISTORY_SUCCESS, action.data);
      return {
        ...state,
        isFetching: false,
        error: false,
        isFetched: true,
        historyId: action.data,
      };
    case FETCHING_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        messageError: action.data.message,
      };
    default:
      return state;
  }
}
export default dataReducer;
