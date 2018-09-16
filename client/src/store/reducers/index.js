import { combineReducers } from 'redux';
import authReducer from './authReducer';
import waitingForUserReducer from './waitingForUserReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    waitingForUser: waitingForUserReducer,
});
export default rootReducer;
