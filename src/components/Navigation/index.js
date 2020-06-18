import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
	return (
 		<Navbar style={{backgroundColor: '#ee1c76'}} expand="lg">
			<Nav style={{ width: "100%" }} fill>
				<Nav.Item>
					<Nav.Link style={{color: 'yellow'}} as={NavLink} to='/order'>
        	Order Online
      		</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link as={NavLink} to='/admin'>
        	Admin Login
      		</Nav.Link>
				</Nav.Item>	
			</Nav>
		</Navbar> 
	)
}
