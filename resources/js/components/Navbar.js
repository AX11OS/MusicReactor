
import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import './css/app.css';

const AdminNavbar2 = () => {
  
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
                <Navbar.Brand href="/">
                        <img height={100} width={100} src = {'./images/image2vector.svg'}/>
                    </Navbar.Brand>
                </Nav>

                </Navbar.Collapse>
                <Nav>
                <Nav.Link href="/"><p className='botonCerrar'>ㅤㅤㅤHomeㅤㅤㅤ</p></Nav.Link>
                  <Nav.Link href="#/Login/"><p className='botonCerrar'>ㅤㅤㅤLoginㅤㅤㅤ</p></Nav.Link>
                  <Nav.Link href="#/SignUp/"><p className='botonCerrar'>ㅤㅤㅤSignUpㅤㅤㅤ</p></Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    </div>
  );
};
  
export default AdminNavbar2;