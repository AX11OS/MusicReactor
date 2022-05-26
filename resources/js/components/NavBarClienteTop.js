
import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import './css/app.css';

const NavBarClienteTop = () => {
  
  return (
    <div>
        <Navbar
            collapseOnSelect
            expand="lg"
        >
            <Container style={{ backgroundColor: "rgba(0,0,0,0.0)", color: 'white' }}>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">

                </Nav>

                </Navbar.Collapse>
                <Nav>
                    <Nav.Link href="#/LogIn/Login"><p className='botonCerrar'>Cerrar Sesión</p></Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    </div>
  );
};
  
export default NavBarClienteTop;