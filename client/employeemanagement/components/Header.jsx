import React from 'react'
import Nav from "react-bootstrap/Nav";
import { Link } from 'react-router-dom';
import Logout from './Logout';

function Header() {
  return (
    <div>
        <Nav className="justify-content-center bg-light py-3" activeKey="/home">
        <Nav.Item>
          <Nav.Link as={Link} to="/home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/addform">Add Form</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/account">Account</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Logout/>
        </Nav.Item>
        
      </Nav>
    </div>
  )
}

export default Header