import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactNavbar from "react-responsive-animate-navbar";
import logo from '/images/image2vector.svg';
function Navbar() {
    return (
        <ReactNavbar.ReactNavbar
        color="rgb(25, 25, 25)"
        logo={logo}
        menu={[
          { name: "Panel", to: "/"},
          { name: "Géneros", to: "/#/Admin/Generos" },
          { name: "Artistas", to: "/#/Admin/Artistas"},
          { name: "Álbumes", to: "/#/Admin/Albums" },
          { name: "Canciones", to: "/#/Admin/Canciones" },
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

