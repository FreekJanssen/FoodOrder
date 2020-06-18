import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import { fetchMenu } from '../store/menu/actions.js';

export default function Order() {
  
  const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchMenu)
	},[dispatch]);

  return (
    <div>
            
    </div>
  )
}
