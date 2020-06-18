import { combineReducers } from "redux";
import menu from './menu/reducer';
import order from './order/reducer';

export default combineReducers({
    menu,
    order
});