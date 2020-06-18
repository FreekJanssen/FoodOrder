
const initialState = 
  {
    customerAddress: '',
    customerPhone: 0,
    mealCompositions: [],
    totalPrice: 0,
    comment: ''
  };

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  };
};