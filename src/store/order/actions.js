export function addMealToOrder(meal, names){
  return { type: 'ADD_MEAL', payload: { meal, names } };
}