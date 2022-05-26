import React from 'react';
import {Routes, Route} from 'react-router-dom';
import AdminNavBar from './AdminNavbar'
import AdminArtistas from './AdminArtistas';


export default function AdminPanel(){
    return(
        <div>
            <div>
                <AdminNavBar/>
            </div>
            <video  className="videoBlur" autoPlay loop muted>
                <source src="/videos/fondoAdmin.mp4" type="video/mp4"/>
            </video>
            <div>
                <Routes>
                    <Route
                        path='/Artistas'
                        element={<AdminArtistas/>}
                    />
                </Routes>
            </div>
        </div>
    );
}