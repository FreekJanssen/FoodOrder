import axios from 'axios';

export function adminLogin(username, password) {
  return async (dispatch, getState) => {

    try {
      const response = await axios.post(`http://localhost:4000/login`, {
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