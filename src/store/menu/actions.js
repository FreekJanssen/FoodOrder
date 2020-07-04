import axios from 'axios';
import { apiUrl } from '../../config/constants';

export async function fetchMenu (dispatch, getState){
	try{
  	const response = await axios.get(`${apiUrl}/menu`);
		dispatch({ type: 'FETCH_MENU_SUCCESS', payload: response.data });
	} catch(e){
		console.log(e)
	};
};