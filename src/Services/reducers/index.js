import { combineReducers } from 'redux'
import authData from './authReducer';
import modelData from './modelReducer';

const rootReducer = combineReducers({
    authData, modelData,
});
export default rootReducer;