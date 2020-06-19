import axios from 'axios';

export function addMealToOrder(meal, names){
  return { type: 'ADD_MEAL', payload: { meal, names } };
}

export function orderComplete(customerAddress, customerPhone){ 
  return async (dispatch, getState) => {

    dispatch({ type: 'ORDER_COMPLETED', payload: { customerPhone, customerAddress } });
    const { order } = getState();

    try{
      const response = await axios.post(
        `http://localhost:4000/order`,
        { order }
      );  
      //dispatch(success(response.data));
    }catch(e){
      console.log(e)
    };
  };
};