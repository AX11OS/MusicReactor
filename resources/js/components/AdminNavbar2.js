
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
                <Navbar.Brand href="/PanelAdmin/">
                        <img height={50} width={50} src = {'./images/image2vector.svg'}/>
                    </Navbar.Brand>
                </Nav>

                </Navbar.Collapse>
                <Nav>
                <Nav.Link href="#/PanelAdmin/Genders/"><p className='botonCerrar'>ㅤㅤㅤGendersㅤㅤㅤ</p></Nav.Link>
                  <Nav.Link href="#/PanelAdmin/Artistas/"><p className='botonCerrar'>ㅤㅤㅤArtistsㅤㅤㅤ</p></Nav.Link>
                  <Nav.Link href="#/PanelAdmin/Albums/"><p className='botonCerrar'>ㅤㅤㅤAlbumsㅤㅤㅤ</p></Nav.Link>
                  <Nav.Link href="#/PanelAdmin/Canciones/"><p className='botonCerrar'>ㅤㅤㅤSong Bookㅤㅤㅤ</p></Nav.Link>
                    <Nav.Link href="/"><p className='botonCerrar'>ㅤㅤㅤLogoutㅤㅤㅤ</p></Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    </div>
  );
};
  
export default AdminNavbar2;