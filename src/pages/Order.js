import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import OrderForm from '../components/Order';

import { fetchMenu } from '../store/menu/actions.js';
import { selectMenu } from '../store/menu/selectors.js';

export default function Order() {

  const dispatch = useDispatch();
  const menu = useSelector(selectMenu);

	useEffect(() => {
		dispatch(fetchMenu)
  },[dispatch]);
  
  if (!menu) return <></>;
  return <OrderForm {...menu}/>;
}
