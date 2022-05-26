
import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { NavBarClienteDatos } from "./NavBarClienteDatos";
import NavBarClienteSubMenu from "./NavBarClienteSubMenu";
import { IconContext } from "react-icons/lib";
import Navbar from "react-bootstrap/Navbar";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import './css/app.css';
import ClienteInicio from "./ClienteInicio";
const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;

  top: 0;
  justify-content: center;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;
  
const SidebarWrap = styled.div`
  width: 100%;
`;
  
const NavBarCliente = () => {
  const [sidebar, setSidebar] = useState(true);
  
  return (
    <div>
      <IconContext.Provider value={{ color: "#fff" }}>
        <SidebarNav sidebar={sidebar}>
            <SidebarWrap>
            <Navbar.Brand href="./" style={{color: 'white', alignItems: 'center', alignContent: 'center'}}>
                      <img
                          alt=""
                          src="./images/image2vector.svg"
                          width="50"
                          height="50"
                          style={{ padding: 5, paddingLeft:15}}
                      />{"Music Reactor "}
            </Navbar.Brand>
            {NavBarClienteDatos.map((item, index) => {
              return <NavBarClienteSubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </div>
  );
};
  
export default NavBarCliente;