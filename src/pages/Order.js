import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Container, Button, Form } from 'react-bootstrap'

import OrderForm from '../components/Order';

import { fetchMenu } from '../store/menu/actions.js';
import { selectMenu } from '../store/menu/selectors.js';
import { selectOrder } from '../store/order/selectors.js';

export default function Order() {

  const dispatch = useDispatch();
  const menu = useSelector(selectMenu);
  const order = useSelector(selectOrder)

	useEffect(() => {
		dispatch(fetchMenu)
  },[dispatch]);

  const style = 
    {
      width: '100vw',
      backgroundColor: '#ee1c76'
    }

  function orderBar () {
    if (order.mealCompositions.length === 0) return <Container style={style}/>
    const { mealNames, totalPrice } = order;
    return (
      <Container style={style}>
        <Row>
        <Col md={9}>
        {mealNames.map((meal) => {
          return (
            <p style={{padding: '5px', marginTop: '5px', border: '1px solid yellow'}}>
              {meal.meal}, 
              {meal.filling} 
              with {meal.toppings.map(topping => <span>{topping}</span>)}
              and {meal.salsa}
            </p>
          )
        })}
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control size="sm" type="text" placeholder="Voorstraat 1" />
            <br />
            <Form.Label>Phone Number</Form.Label>
            <Form.Control size="sm" type="text" placeholder="Phone number" />
            <p>€ {order.totalPrice.toFixed(2)}<Button>ORDER</Button></p>
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
