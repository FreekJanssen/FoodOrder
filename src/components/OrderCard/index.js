import React from 'react';
import { Col } from 'react-bootstrap';
import './OrderCard.css';

export default function OrderCard(props) {
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
      <div className="row justify-content-end">
        <button className='col-6 mr-5' value={props.id} onClick={props.orderDone}>Done</button>
      </div>
    </div>
    </div>
  )
}
