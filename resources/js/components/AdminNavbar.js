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
          { name: "Panel", to: "/#/PanelAdmin"},
          { name: "Géneros", to: "/#/PanelAdmin/Generos" },
          { name: "Artistas", to: "/#/PanelAdmin/Artistas"},
          { name: "Álbumes", to: "/#/PanelAdmin/Albums" },
          { name: "Canciones", to: "/#/PanelAdmin/Canciones" },
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

