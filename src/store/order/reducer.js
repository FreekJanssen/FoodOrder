
const initialState = 
  {
    customerAddress: '',
    customerPhone: 0,
    mealCompositions: [],
    mealNames: [],
    totalPrice: 0,
    comment: ''
  };

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_MEAL':
      return {
        ...state, 
        totalPrice: state.totalPrice + 9.9, 
        mealCompositions: [...state.mealCompositions, action.payload.meal],
        mealNames: [...state.mealNames, action.payload.names] 
      };
    case 'ORDER_COMPLETED':
      const { customerAddress, customerPhone } = action.payload;
      return {...state, customerAddress, customerPhone};
    default:
      return state;
  };
};