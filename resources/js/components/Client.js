import React,{useState} from 'react';
import Reproductor from './Reproductor';
import NavBarCliente from './NavBarCliente';
import NavBarClienteTop from './NavBarClienteTop';
import ClienteInicio from './ClienteInicio';
import {Routes, Route} from 'react-router-dom';
import ClientFavs from './ClientFavs';
import ClientPlaylist from './ClientPlaylist';

export default function Client(){
    const [core, setCore] = useState([]);
    const [index, setIndex] = useState(0);

    const updateCore=( newCore )=>{
        if(newCore.core!=core)
            setCore(newCore.core);
        if(newCore.index!=index)
            setIndex(newCore.index)
        console.log(newCore);
    }

    return(
        <div>
            <div style={{display: 'flex'}}>
                <div>
                    <NavBarCliente></NavBarCliente>
                </div>
                <div className='fondoCliente'>
                    <div style={{width:'80%'}}>
                        <NavBarClienteTop/>
                    </div>
                    <div style={{width: '100vw', height:'100%'}}>
                        <Routes>
                            <Route index element={<ClienteInicio/>}/>
                            <Route 
                                path='/Favorites/'
                                element={<ClientFavs updateCore = {updateCore} />}/>
                            <Route 
                                path='/Playlist/'
                                element={<ClientPlaylist/>}/>
                        </Routes>
                    </div>
                </div>

            </div>
            <div style={{position: 'absolute', bottom:0, left: 0, right: 0, zIndex: 11}}>
                <Reproductor core = {core} index = {index}/>
            </div>
        </div>
    );
}