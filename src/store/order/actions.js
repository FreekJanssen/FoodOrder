import axios from 'axios';
import { apiUrl } from '../../config/constants';

export function addMealToOrder(meal, names){
  return { type: 'ADD_MEAL', payload: { meal, names } };
}

export function orderComplete(customerAddress, customerPhone){ 
  return async (dispatch, getState) => {

    dispatch({ type: 'ORDER_COMPLETED', payload: { customerPhone, customerAddress } });
    const { order } = getState();

    try{
      const response = await axios.post(
        `${apiUrl}/order`,
        { order }
      );  
    }catch(e){
      console.log(e)
    };
  };
};