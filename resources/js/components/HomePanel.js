import React from 'react';
import ReactDOM from 'react-dom';
import './css/app.css'
import Navbar from './Navbar';
import {Routes, Route} from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
import Reproductor from './Reproductor';
function HomePanel() {
    return (
        <div>
            <div>
                <Navbar/>
            </div>
            <Routes>
                <Route 
                    index
                    element={<Home/>}
                />
                <Route
                    path='/HomePanel/Login'
                    element={<Reproductor/>}
                />
                <Route
                    path='/HomePanel/SignUp'
                    element={<SignUp />}
                />
            </Routes>
        </div>
    );
}

export default HomePanel;

if (document.getElementById('homepanel')) {
    ReactDOM.render(<HomePanel />, document.getElementById('homepanel'));
}

