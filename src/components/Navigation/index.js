import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { selectAdminToken } from "../../store/admin/selectors";


export default function NavBar() {
  const dispatch = useDispatch();
  const adminToken = useSelector(selectAdminToken);

  function loggedIn(){
    return (
      <>
      <Nav.Item>
        <Nav.Link as={NavLink} to='/orders'>
        View Current Orders
        </Nav.Link>
      </Nav.Item>	
      <Button onClick={() => dispatch({ type: 'LOGOUT' })}>Logout</Button>
      </>
    )
  };

  function notLoggedIn(){
    return (
      <Nav.Item>
        <Nav.Link as={NavLink} to='/admin'>
        Admin Login
        </Nav.Link>
      </Nav.Item>	
    )
  };

	return (
 		<Navbar style={{backgroundColor: '#ee1c76'}} expand="lg">
			<Nav style={{ width: "100%" }} fill>
				<Nav.Item>
					<Nav.Link as={NavLink} to='/order'>
        	Order Online
      		</Nav.Link>
				</Nav.Item>
        {adminToken ? loggedIn() : notLoggedIn()}
			</Nav>
		</Navbar> 
	)
}
