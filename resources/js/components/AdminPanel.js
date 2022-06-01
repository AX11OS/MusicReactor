import React from 'react';
import {Routes, Route} from 'react-router-dom';
import AdminNavBar from './AdminNavbar'
import ArtistasConsultar from './ArtistasConsultar';
import ArtistasCrear from './ArtistasCrear';
import ArtistasEditar from './ArtistasEditar';
import GendersConsultar from './GendersConsultar';
import GendersCrear from './GendersCrear';
import GendersEditar from './GendersEditar';
import SongsCreate from './SongsCreate';
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
                    <Route
                        path='/Genders'
                        element={<GendersConsultar/>}
                    />
                    <Route
                        path='/Genders/Crear'
                        element={<GendersCrear/>}
                    />
                    <Route
                        path='/Genders/Editar/:id'
                        element={<GendersEditar/>}
                    />
                    <Route
                        path='/Genders'
                        element={<GendersConsultar/>}
                    />
                    <Route
                        path='/Songs/Create'
                        element={<SongsCreate/>}
                    />
                    <Route
                        path='/Genders/Editar/:id'
                        element={<GendersEditar/>}
                    />
                </Routes>
            </div>
        </div>
    );
}