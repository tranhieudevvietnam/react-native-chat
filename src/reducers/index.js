import {combineReducers} from 'redux';
import loginReducer from '../pages/login/reducers/dataReducer';
import contactReducer from '../pages/home/contacts/reducers/contactReducer';
import chatReducer from '../pages/chat/reducers/dataReducer';
import historyReducer from '../pages/home/historys/reducers/historyReducer';

const rootReducer = combineReducers({
  loginReducer: loginReducer,
  contactReducer: contactReducer,
  chatReducer: chatReducer,
  historyReducer: historyReducer,
});

export default rootReducer;
