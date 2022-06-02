import React,{useState, useRef} from 'react';
import Reproductor from './Reproductor';
import NavBarCliente from './NavBarCliente';
import NavBarClienteTop from './NavBarClienteTop';
import ClienteInicio from './ClienteInicio';
import {Routes, Route} from 'react-router-dom';
import ClientFavs from './ClientFavs';
import ClientPlaylist from './ClientPlaylist';
import Player from './Player';
import ClientArtist from './ClientArtist';
import ClientSearch from './ClientSearch'
import { useParams } from 'react-router-dom';
export default function Client(){
    const [core, setCore] = useState([]);
    const [idx, setIndex] = useState(0);
    const [isPlay, setisPlay] = useState(false);
    const updatePlay=(newState)=>{
        setisPlay(newState);
    }
    const updateCore=( newCore )=>{
        if(newCore!=core)
            setCore(newCore);
        console.log(core);
    }
    const updateIndex = (newIndex)=>{
        if(newIndex!=idx)
            setIndex(newIndex);
        console.log(idx);
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
                                path='/Artist/:id'
                                element={<ClientArtist updateCore = {updateCore} updateIndex = {updateIndex} updatePlay={updatePlay} isPlay={isPlay}  />}/>
                            <Route 
                                path='/Search/:search'
                                element={<ClientSearch updateCore = {updateCore} updateIndex = {updateIndex} updatePlay={updatePlay} isPlay={isPlay}  />}/>
                            <Route 
                                path='/Playlist/'
                                element={<ClientPlaylist updateCore = {updateCore} updateIndex = {updateIndex} updatePlay={updatePlay} isPlay={isPlay}/>}/>
                        </Routes>
                    </div>
                </div>

            </div>
            <div style={{position: 'absolute', bottom: 0, left:0, right:0}}>
                <Player core={core} idx={idx} updatePlay={updatePlay} isPlay={isPlay}  updateIndex={updateIndex}/>
            </div>
        </div>
    );
}