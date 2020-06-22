import { combineReducers } from "redux";
import menu from './menu/reducer';
import order from './order/reducer';
import admin from './admin/reducer';

export default combineReducers({
    admin,
    menu,
    order
});