import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, NavLink, Routes } from "react-router-dom";
import Welcome from "./Welcome";
import Home from "./Home";

function Cisco() {
    return (
        <div>
        <Router>
            <Routes>
                <Route index element={<Welcome/>} />
                <Route path="/Home/*" element={<Home/>} />
            </Routes>
        </Router>
    </div>
    );
}

export default Cisco;

if (document.getElementById('cisco')) {
    ReactDOM.render(<Cisco />, document.getElementById('cisco'));
}
