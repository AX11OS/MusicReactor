import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactNavbar from "react-responsive-animate-navbar";
import AlbumsConsultar from './AlbumsConsultar';
import logo from '/images/image2vector.svg';

function Navbar() {
    return (
        <ReactNavbar.ReactNavbar
        color="rgb(25, 25, 25)"
        logo={logo}
        menu={[
          { name: "Géneros", to: "#/PanelAdmin/Generos/" },
          { name: "Artistas", to: "#/PanelAdmin/Artistas/", },
          { name: "Álbumes", to: "#/PanelAdmin/Albums/", component: AlbumsConsultar },
          { name: "Canciones", to: "#/PanelAdmin/Canciones/" },
          { name: "Logout", to: "#/LogIn/Login" },
        ]}
        social={[
        ]}
      />
    );
}

export default Navbar;

if (document.getElementById('navbar')) {
    ReactDOM.render(<Navbar />, document.getElementById('navbar'));
}

