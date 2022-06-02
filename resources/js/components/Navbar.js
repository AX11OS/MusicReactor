import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactNavbar from "react-responsive-animate-navbar";
import Home from './Home';
import logo from '/images/image2vector.svg';
import SignUp from './SignUp';
function Navbar() {
  return (
    <ReactNavbar.ReactNavbar
      color="rgb(25, 25, 25)"
      logo={logo}
      menu={[
        { name: "HOME", to: "/"},
          { name: "PLANS", to: "/#/HomePanel/planes" },
          { name: "LOGIN", to: "/#/Login" },
          { name: "SIGNUP", to: "/#/SignUp"},
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

