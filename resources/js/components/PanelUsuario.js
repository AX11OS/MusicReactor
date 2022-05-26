import React from 'react';
import Reproductor from './Reproductor';

export default function PanelUsuario(){
    return(
        <div>
            <div style={{position: 'absolute', bottom:0, left: 0, right: 0}}>
                <Reproductor/>
            </div>
        </div>
    );
}