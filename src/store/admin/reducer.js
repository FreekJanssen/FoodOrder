
const initialState = { token: localStorage.getItem('adminToken')};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      localStorage.setItem('adminToken', action.payload);
      return { ...state, token: action.payload};
    default:
      return state;
  };
};