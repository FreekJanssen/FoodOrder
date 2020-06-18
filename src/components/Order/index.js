import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Container, Button, Row, Col } from 'react-bootstrap';

import { addMealToOrder } from '../../store/order/actions';

export default function OrderForm(props) {
  const dispatch = useDispatch();
  
  const { meals, fillings, toppings, salsas } = props;
  const [state, setState] = useState({ meal: 0, filling: 0, toppings: [], salsa: 0});
  const [naming, setNaming] = useState({ meal: '', filling: '', toppings: [], salsa: ''});
  

  function chooseOne (items, group) {

  return (
    <Col xs={12} md={3}>
      <h2>Choose your {group.toUpperCase()}</h2>
        {items.map((item, i) => {
          const style = (item.id === state[group]) ? {backgroundColor: 'black'} : null;
          return ( 
            <Button
              key={group+i}
              style={style}
              variant="secondary"
              name={group}
              value={item.id}
              onClick={(e) => {
                setState({...state, [group]: parseInt(e.target.value)})
                setNaming({...naming, [group]: item.name})
              }} 
            >
              {item.name}
            </Button>
          )
        })}
    </Col>
    );  
  };

  function chooseMultiple(items, group) {

    return (
      <Col>
        <h2>Choose your {group.toUpperCase()}</h2>
          {items.map((item, i) => {
            const style = (state[group].includes(item.id)) ? {backgroundColor: 'black'} : null;
            return ( 
              <Button
                key={group+i}
                style={style}
                variant="secondary"
                name={group}
                value={item.id}
                onClick={(e) => {
                  if(state[group].includes(item.id)){
                    setState({...state, [group]: state[group].filter(i => i !== item.id)});
                    setNaming({...naming, [group]: naming[group].filter(i => i !== item.name)});
                  }else {
                    setState({ ...state, [group]: [...state[group], parseInt(e.target.value)] });
                    setNaming({...naming, [group]: [...naming[group], item.name] });
                  }
                }} 
              >
                {item.name}
              </Button>
            )
          })}
      </Col>
      );  
    };

  function addOrder(){
    dispatch(addMealToOrder(state, naming));
    setState({ meal: 0, filling: 0, toppings: [], salsa: 0});
    setNaming({ meal: '', filling: '', toppings: [], salsa: ''});
  }

  if (!meals) return null;
  return <Container>
          <Row>
            {chooseOne(meals, 'meal')}
            {chooseOne(fillings, 'filling')}
            {chooseOne(salsas, 'salsa')}
            {chooseMultiple(toppings, 'toppings')}
          </Row>
          {(state.meal && state.filling && state.salsa) 
          ? <Button onClick={addOrder}>Add to order</Button> 
          : null}
        </Container>
};
