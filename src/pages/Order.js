import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Container, Button, Form } from 'react-bootstrap'

import OrderForm from '../components/Order';

import { fetchMenu } from '../store/menu/actions.js';
import { orderComplete } from '../store/order/actions';
import { selectMenu } from '../store/menu/selectors.js';
import { selectOrder } from '../store/order/selectors.js';

export default function Order() {

  const dispatch = useDispatch();
  const menu = useSelector(selectMenu);
  const order = useSelector(selectOrder);
  const initialState = { address: 'Bijv. Voorstraat 1' , phone: 'Voer je telefoonnummer in' }
  const [customerAddress, setCustomerAddress] = useState(initialState.address);
  const [customerPhone, setCustomerPhone] = useState(initialState.phone);

	useEffect(() => {
		dispatch(fetchMenu)
  },[dispatch]);

  const style = 
    {
      width: '100vw',
      backgroundColor: '#ee1c76'
    }

  function submitOrder(){
    if (customerAddress === initialState.address || customerPhone === initialState.phone) return;
    if (order.mealCompositions.length === 0) return;
    dispatch(orderComplete(customerAddress, customerPhone));
  }

  function orderBar () {
    if (order.mealCompositions.length === 0) return <Container style={style}/>
    const { mealNames, totalPrice } = order;
    return (
      <Container style={style}>
        <Row>
        <Col md={9}>
        {mealNames.map((meal, i) => {
          return (
            <p key={i} style={{padding: '5px', marginTop: '5px', border: '1px solid yellow'}}>
              {meal.meal}, 
              {meal.filling} 
              with {meal.toppings.map((topping, i) => <span key={i}>{topping}</span>)}
              and {meal.salsa}
            </p>
          )
        })}
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control size="sm" type="text" 
              value={customerAddress} onChange={e => setCustomerAddress(e.target.value)} />
            <br />
            <Form.Label>Phone Number</Form.Label>
            <Form.Control size="sm" type="text" 
              value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} />
            <p>€ {totalPrice.toFixed(2)}
              <Button onClick={submitOrder}>ORDER</Button>
            </p>
          </Form.Group>
        </Col>
        </Row>
      </Container>
    )
  }

  if (!menu) return null;
  return ( 
    <>
      <OrderForm {...menu}/>
      {orderBar()}
    </>
  );   
};
