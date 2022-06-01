import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, NavLink, Routes } from "react-router-dom";
import Welcome from "./Welcome";
import HomePanel from "./HomePanel";
import Client from './Client';
import AdminPanel from './AdminPanel';
import './css/app.css'
import Login from './Login';
function Cisco() {
    return (
        <div className="fullwindow">
            <Router>
                <Routes>
                    <Route index element={<Welcome/>} />
                    <Route path="/HomePanel/*" element={<HomePanel/>} />
                    <Route path="/Login/*" element={<Login/>} />
                    <Route path="/Client/*" element={<Client/>} />
                    <Route path="/PanelAdmin/*" element={<AdminPanel/>} />
                </Routes>
            </Router>
    </div>
    );
}

export default Cisco;

if (document.getElementById('cisco')) {
    ReactDOM.render(<Cisco />, document.getElementById('cisco'));
}
