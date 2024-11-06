import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { CiLogout } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';


function Header(props) {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate(); // Mover useNavigate para aqui

  const toggle = () => setIsOpen(!isOpen);

 

  return (
    <Navbar className='justify-content-between position-absolute col-12 z-3'  dark expand="lg" {...props}>
      <NavbarBrand className='text-dark d-flex' href='/'>
        <img src='../../../public/img/SENAI.jpg' style={{ width: "150px"}} alt='logo' />
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto d-flex justify-content-end col-12 p-1" navbar>
          <NavItem className="d-flex align-items-center">
            <NavLink className='text-dark' href="/list">
              <span className="material-symbols-outlined fs-2">list_alt</span>
            </NavLink>
          </NavItem>
          <NavItem className="d-flex align-items-center">
            <NavLink className='text-dark' href="/rank">
              <span className="material-symbols-outlined fs-2">trophy</span>
            </NavLink>
          </NavItem>
          <NavItem className="d-flex align-items-center">
            <NavLink className='text-dark' href="/user">
              <span className="material-symbols-outlined fs-2">account_circle</span>
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default Header;
