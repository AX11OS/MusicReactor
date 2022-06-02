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
import SongsQuery from './SongsQuery';
import SongsEdit from './SongsEdit';
import AlbumsConsultar from './AlbumsConsultar';
import AlbumsCrear from './AlbumsCrear';
import AlbumsEditar from './AlbumsEditar';

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
                        path='/Albums'
                        element={<AlbumsConsultar/>}
                    />
                    <Route
                        path='/Albums/Crear'
                        element={<AlbumsCrear/>}
                    />
                    <Route
                        path='/Albums/Editar/:id'
                        element={<AlbumsEditar/>}
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
                        path='/Songs'
                        element={<SongsQuery/>}
                    />
                    <Route
                        path='/Songs/Create/:id'
                        element={<SongsCreate/>}
                    />
                    <Route
                        path='/Songs/Edit/:id'
                        element={<SongsEdit/>}
                    />
                </Routes>
            </div>
        </div>
    );
}