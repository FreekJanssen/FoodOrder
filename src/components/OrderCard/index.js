import React from 'react';
import { Col, Container } from 'react-bootstrap';
import './OrderCard.css';

export default function OrderCard(props) {

  const time = props.createdAt.split('T')[1];
  const [hoursGMT, minutes] = time.split(':');
  const hours = parseInt(hoursGMT)+2;

  return (
    <Col md={3} className='mt-5 orderCol'>
      <Container className='orderCard'>
        <Col>        
          <h5 >Address: <strong>{props.customerAddress}</strong></h5>
          <h5 >Number:{' '}<strong>{props.customerPhone}</strong></h5>
        </Col>
          <Col className='md-12 mb-5 mealWrap'>
            {props.mealCompositions.map((mc) => {
              return( 
                <p><strong>{mc.meal.name},{' '}{mc.filling.name}</strong><br/>
                  -{mc.toppings.map((topping, i) => {
                    const comma = (i < mc.toppings.length-1) ? ',' : '';
                    return <span>{topping.name+comma+' '}</span>
                  })}<br/>
                  -{mc.salsa.name}
                </p>
              )
            })}
          </Col>
          <span className='placedAt'>Placed At: {hours}:{minutes}</span>
          <button className='doneButton' value={props.id} onClick={props.orderDone}>Done</button>       
      </Container>
    </Col>
  )
}
