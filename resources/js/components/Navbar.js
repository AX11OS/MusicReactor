import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactNavbar from "react-responsive-animate-navbar";
import Home from './Home';
import logo from '/images/image2vector.svg';
function Navbar() {
    return (
        <ReactNavbar.ReactNavbar
        color="rgb(25, 25, 25)"
        logo={logo}
        menu={[
          { name: "HOME", to: "/"},
          { name: "PLANES", to: "/planes" },
          { name: "ACCEDE", to: "/login" },
          { name: "REGÍSTRATE", to: "/signup" },
        ]}
        social={[
          {
            name: "Facebook",
            url: "https://www.facebook.com",
            icon: ["fab", "facebook-f"],
          },
          {
            name: "Instagram",
            url: "https://www.instagram.com",
            icon: ["fab", "instagram"],
          },
        ]}
      />
    );
}

export default Navbar;

if (document.getElementById('navbar')) {
    ReactDOM.render(<Navbar />, document.getElementById('navbar'));
}

