import axios from 'axios';
import { apiUrl } from '../../config/constants';

export function adminLogin(username, password) {
  return async (dispatch, getState) => {

    try {
      const response = await axios.post(`${apiUrl}/login`, {
        username,
        password
      });
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.token });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);

      } else {
        console.log(error.message);

      };
    };
  };
};