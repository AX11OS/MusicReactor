import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import { useSpring, animated } from 'react-spring';
import {Award, Search} from 'react-bootstrap-icons'
function Text() {
  const styles = useSpring({
      from: { opacity: "0" },
      to: { opacity: "1" },
      config: { duration: "1500" }
    })
  return <div>
          <animated.div style={styles}>
              Artistas
          </animated.div>
      </div>
}
function Card(props){
  return(
    <div style={{textAlign: 'center', color: 'white', alignContent: 'center', maxWidth:'100px'}}>
      <img style ={{maxWidth: '100px', width: '100%', height: 'auto', borderRadius:50}} src ={props[0]}/>
      <p>Sexo</p>
    </div>
  );
}

function AdminArtistas() {
  const [artistas, setArtistas] = useState([]);

  return (
    <div>
      <div style={{fontSize: 50, color: 'white', zIndex:1, paddingTop: 25, paddingLeft: 250}}>
        <Text/>
      </div>
      {(artistas[0]==null)?<div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <div>
            <button onClick={()=> console.log("putoooo")} className ='botonbuscar'><Award/>Agregar nuevo artista</button>
          </div>
          <div>
            <input type='text' placeholder="🔎 Buscar" style={{backgroundColor: 'rgba(0,0,0,0.0)', color: 'white', fontSize: 30, right: 50,border: '0px solid black'}}></input>
          </div>
        </div>
        <div className="cards">
          <Card props={["/images/logoMR.png",'SEXO']}/>
          <Card props={["/images/logoMR.png",'SEXO']}/>
        </div></div> : <div style={{fontSize: 50, color: 'white',paddingLeft: 50, paddingTop: 200}}>No hay artistas registrados</div>
      }
    </div>
  );
}

export default AdminArtistas;

if (document.getElementById('adminartistas')) {
    ReactDOM.render(<AdminArtistas />, document.getElementById('adminartistas'));
}

