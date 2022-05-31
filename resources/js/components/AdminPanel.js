import React from 'react';
import {Routes, Route} from 'react-router-dom';
import AdminNavBar from './AdminNavbar'
import ArtistasConsultar from './ArtistasConsultar';
import ArtistasCrear from './ArtistasCrear';
import ArtistasEditar from './ArtistasEditar';

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
                        element={<ArtistasConsultar/>}
                    />
                    <Route
                        path='/Artistas/Crear'
                        element={<ArtistasCrear/>}
                    />
                    <Route
                        path='/Artistas/Editar/:id'
                        element={<ArtistasEditar/>}
                    />
                    
                </Routes>
            </div>
        </div>
    );
}