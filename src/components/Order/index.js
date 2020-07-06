import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Loading from '../Loading';
import { emojis } from './emoji';

import { Container, Button, Row, Col } from 'react-bootstrap';

import { addMealToOrder } from '../../store/order/actions';
import './Order.css'

export default function OrderForm(props) {
  const dispatch = useDispatch();
  
  const { meals, fillings, toppings, salsas } = props;
  const [state, setState] = useState({ meal: 0, filling: 0, toppings: [], salsa: 0});
  const [naming, setNaming] = useState({ meal: '', filling: '', toppings: [], salsa: ''});
  

  function chooseOne (items, group) {
    
  return (
    <Col xs={12} md={3} className='mt-3 mb-3 chooseOne'>
      <h2 className='mb-4'>Choose Your 
      <h3>{group.toUpperCase()} {group === 'meal' && <span>€ 9.90</span>}</h3>
      </h2>
        {items.map((item, i) => {
          const style = (item.id === state[group]) 
          ? {backgroundColor: 'yellow', borderRadius: '50%', borderColor: 'yellow'} 
          : {backgroundColor: 'transparent', border: 'none'};
          return (             
            <Row key={i} className='mt-2'>
            <Col xs={{span: 6, offset: 2}} md={{span: 9, offset: 0}} className='menuItem'>
              {item.name}
            </Col>
            <Col xs={4} md={3}>
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
              {emojis[group][item.id]}
            </Button>
            </Col>
            </Row>
          )
        })}
    </Col>
    );  
  };

  function chooseMultiple(items, group) {

    return (
      <Col className='mt-3 mb-3'>
        <h2 className='mb-4'>Choose Your <h3>{group.toUpperCase()}</h3></h2>
          {items.map((item, i) => {
            const style = (state[group].includes(item.id)) 
            ? {backgroundColor: 'yellow', borderRadius: '50%', borderColor: 'yellow'} 
            : {backgroundColor: 'transparent', border: 'none'};
            return (
             <Row key={i} className='mt-2'>
              <Col xs={{span: 6, offset: 2}} md={{span: 9, offset: 0}} className='menuItem'>
                {item.name}
              </Col>
              <Col xs={4} md={3}>
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
                {emojis[group][item.id]}
              </Button>
              </Col>
              </Row>
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

  if (!meals || !toppings) return <Loading />;
  return (
    <Container className='mt-2'>
      <Row className='orderMenu' >
        {chooseOne(meals, 'meal')}
        {chooseOne(fillings, 'filling')}
        {chooseOne(salsas, 'salsa')}
        {chooseMultiple(toppings, 'toppings')}
      </Row>
      <Row className='pt-2 pb-1 mb-2 addButtonWrap'>        
        <Button
          disabled={!state.meal || !state.filling || !state.salsa || !state.toppings.length} 
          onClick={addOrder}>
          Add to order!
        </Button> 
      </Row>
    </Container>
  );
};
