
import { combineReducers } from 'redux';
import  erorrsLoginReducer from './errors.login.reducer';
import  erorrsRegisterReducer from './errors.register.reducer';
import  authLoginReducer from './auth.login.reducer';
// combine all reducers from another module
export default combineReducers({
  erorrsLoginReducer,
  authLoginReducer,
  erorrsRegisterReducer
});