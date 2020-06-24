import React, { useEffect, useState } from 'react';
import axios from 'axios';

import OrderCard from '../components/OrderCard';
import { Container, Col, Row } from 'react-bootstrap';

export default function CurrentOrders() {

  const [ orders, setOrders ] = useState([]);
  const [ listening, setListening ] = useState(false);

  useEffect( () => {
    if (!listening) {
      const events = new EventSource('http://localhost:4000/order');
      events.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        setOrders((orders) => orders.concat(parsedData));
      };

      setListening(true);
    }
  }, [listening, orders]);

  async function orderDone(event) {
    const orderId = parseInt(event.target.value);
    setOrders(orders.filter(o => o.id !== orderId));

    try{
      const response = await axios.patch(`http://localhost:4000/order/${orderId}/done`);
      console.log(response.data.message);
    }catch(e){
      console.log(e.message);
    };
  };

  return (
    <Container>
      <Row>
      {orders.map((order) => {
        if (!!order.completed) return null;
        return <OrderCard {...order} orderDone={orderDone}/>
      })}
      </Row>
    </Container>
  )
}
