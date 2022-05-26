import React from 'react';
import Reproductor from './Reproductor';
import NavBarCliente from './NavBarCliente';
import NavBarClienteTop from './NavBarClienteTop';
import ClienteInicio from './ClienteInicio';
export default function PanelUsuario(){
    return(
        <div>
            <div>

            </div>
            <div style={{position: 'absolute', bottom:0, left: 0, right: 0, zIndex: 11}}>
                <Reproductor/>
            </div>
            <div style={{display: 'flex'}}>
                <div>
                    <NavBarCliente></NavBarCliente>
                </div>
                <div className='fondoCliente'>
                    <div style={{width:'80%'}}>
                        <NavBarClienteTop/>
                    </div>
                    <div>
                        <ClienteInicio/>
                    </div>
                </div>

            </div>

        </div>
    );
}