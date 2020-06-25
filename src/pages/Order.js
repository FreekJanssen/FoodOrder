import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Container, Button, Form } from 'react-bootstrap'

import OrderForm from '../components/Order';

import { fetchMenu } from '../store/menu/actions.js';
import { orderComplete } from '../store/order/actions';
import { selectMenu } from '../store/menu/selectors.js';
import { selectOrder } from '../store/order/selectors.js';

import './Order.css';

export default function Order() {

  const dispatch = useDispatch();
  const menu = useSelector(selectMenu);
  const order = useSelector(selectOrder);
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [ordered, setOrdered] = useState(false);

	useEffect(() => {
		dispatch(fetchMenu)
  },[dispatch]);

  function submitOrder(){
    if (!customerAddress || !customerPhone) return;
    if (order.mealCompositions.length === 0) return;
    if (!ordered){
    dispatch(orderComplete(customerAddress, customerPhone));
    setOrdered(true);
    }
  }

  function orderBar () {
    if (order.mealCompositions.length === 0) return null;
    const { mealNames, totalPrice } = order;
    return (
      <Container className='pt-3' fluid className='orderBar'>
        <Row className='pr-2'>
        <Col md={9}>
        {mealNames.map((meal, i) => {
          return (
            <p key={i} style={{padding: '5px', marginTop: '5px', border: '1px solid yellow', borderRadius: '10px'}}>
              1x <strong>{meal.meal}</strong>,{' '} 
              {meal.filling}{' '} 
              with {meal.toppings.map((topping, i) => {
                const comma = (i < meal.toppings.length-1) ? ',' : '';
                return <span key={i}>{topping.toLowerCase()+comma+' '}</span>
              })}
              and {meal.salsa.toLowerCase()}
            </p>
          )
        })}
        </Col>
        {ordered 
        ? <Col md={3}>
          <h2>Order received! <br/>
            Delivery will take approximately 30 minutes!
          </h2>
        </Col>        
        : <Col md={3}>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control size="sm" type="text" 
              value={customerAddress} onChange={e => setCustomerAddress(e.target.value)}
              placeholder = 'Hoofdstraat 1'
            />
            <br />
            <Form.Label>Phone Number</Form.Label>
            <Form.Control size="sm" type="text" 
              value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} 
              placeholder='060000000'
            />
            <Row className='pt-2'>
              <Col xs={8} className='align-self-center priceTag'>
                Total: € <span>{totalPrice.toFixed(2)}</span>
              </Col>
              <Col xs={2}>
              <Button onClick={submitOrder}>ORDER!</Button>
              </Col>
            </Row>
          </Form.Group>
        </Col>}
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
