import { combineReducers } from "redux";
import AuthReducers from "./AuthReducers";
import Tambahcart from './tambahcartReducers'
import tambahcartReducers from "./tambahcartReducers";

export default combineReducers({
  Auth: AuthReducers,
  Tambahcart:tambahcartReducers
  
});
