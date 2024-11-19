import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { CiLogout } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

function Header({ Dados_usuario }) {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const ImagemUsuario = "http://localhost:3025/public/" + Dados_usuario.user_img_caminho;

  
 const logout = () => {
  Swal.fire({
    title: "Desconectar-se?",
    confirmButtonText: "Sim",
    customClass: {
      confirmButton: 'btn bg-success text-light',
    },
    buttonsStyling: false,
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem('token');
      navigate("/login"); // Usar navigate aqui
    }
  });
}

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar className="justify-content-between position-absolute col-12 z-3" dark expand="lg">
      <NavbarBrand className="text-dark d-flex" href="/">
        <img src="../../../public/img/SENAI.jpg" style={{ width: "150px" }} alt="logo" />
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto d-flex justify-content-end col-12 p-1 gap-4" navbar>
          <NavItem className="d-flex align-items-center">
            <NavLink className="text-dark fs-6 fw-bold" href="/list">
              Jogadores
            </NavLink>
          </NavItem>
          <NavItem className="d-flex align-items-center">
            <NavLink className="text-dark fs-6 fw-bold" href="/rank">
              Rank
            </NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav className="p-0">
              <img
                src={ImagemUsuario}
                alt="Usuário"
                style={{ width:40, height: 40, borderRadius: "40px" }}
              />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem href="/user">
                Perfil
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={logout}>
                <CiLogout /> Sair
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default Header;
