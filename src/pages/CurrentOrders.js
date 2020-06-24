import React, { useEffect, useState } from 'react';
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

  //if (orders.length === 0) return <></>
  return (
    <Container>
      <Row>
      {orders.map((order) => {
        if (!!order.completed) return null;
        return <OrderCard {...order} />
      })}
      </Row>
    </Container>
  )
}
