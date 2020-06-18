import axios from 'axios';

export async function fetchMenu (dispatch, getState){
	try{
  	const response = await axios.get('http://localhost:4000/menu');
		dispatch({ type: 'FETCH_MENU_SUCCESS', payload: response.data });
	} catch(e){
		console.log(e)
	};
};