import React from 'react';
import { Col } from 'react-bootstrap';
import './OrderCard.css';

export default function OrderCard(props) {
  console.log(props);
  return (
    <div className='col-md-3 p-1 mt-5'>
      <div className='orderCard'>
      <h5 >Address: <strong>{props.customerAddress}</strong></h5>
      <h5 >Number:{' '}<strong>{props.customerPhone}</strong></h5>
      <div style={{border: '1px solid black', padding: '2px'}}>
        {props.mealCompositions.map(mc => {
          return( 
            <p>{mc.meal.name},{' '}{mc.filling.name}<br/>
              -{mc.toppings.map((topping) => {
                return <span>{topping.name+' '}</span>
              })}<br/>
              -{mc.salsa.name}
            </p>
          )
        })}
      </div>
      <button style={{display: 'flex', alignSelf: 'start'}}>Done</button>
      </div>
    </div>
  )
}
