import React,{useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { useSpring, animated } from 'react-spring';
import {Award, Search} from 'react-bootstrap-icons';
import {useNavigate, Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button'
import './css/botonchido.css';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal)
import ModalComponent from 'react-modal-dom';

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


function SongsQuery() {
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);
  const [artistas, setArtistas] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    loadSongs()
  }, []);

  const loadSongs = async () => {
    var url = 'http://localhost:8000/api/allofsongs';
    await axios.get(url).then(({data})=>{
        setSongs(data)
        console.log(data)
    })
    var url2 = 'http://localhost:8000/api/albums';
    await axios.get(url2).then(({data})=>{
        setAlbums(data)
    })
    var url3 = 'http://localhost:8000/api/artistas';
    await axios.get(url3).then(({data})=>{
        setArtistas(data)
    })
    
  }

  const Card=(props)=>{
    return(
      <div style={{textAlign: 'center', color: 'white', alignContent: 'center', maxWidth:'100px'}}>
        <img style ={{maxWidth: 30, width: 30, height: 'auto', borderRadius:30}} src ={`./storage/albums/cover/${props.cover}`}/>
        <p>{props.nombre}</p>{props.artist}{props.albumname}
          <button className='btn-5'><Link  to={`/PanelAdmin/Songs/Edit/${props.idsong}`} style={{color: 'white'}}> <FontAwesomeIcon icon={faEdit} /></Link></button>
          {'   '}
          <button className='btn-6' onClick={()=> borrar(props.idsong)}> <FontAwesomeIcon icon={faTrash}/></button>

      </div>
    );
  }
  

  const borrar = async (_idsong)=>{
    const url = `http://localhost:8000/api/songs/${_idsong}`;
    await axios.delete(url).then(({data})=>{
      MySwal.fire({
        title: 'Deleted!',
        position: 'top-end',
        width: 600,
        padding: '3em',
        color: '#FFF',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
        background: '#000000',
        
      })
      consultaArtistas()
    }).catch(({response:{data}})=>{
      console.log("NOOOO");
      MySwal.fire({
        title: 'We foudn and error: ' + response ,
        position: 'top-end',
        width: 600,
        padding: '3em',
        color: '#FFF',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500,
        background: '#000000',
        
      })
    })
  }

  return (
    <div>
      <div style={{fontSize: 50, color: 'white', zIndex:1, paddingTop: 25, paddingLeft: 250}}>
        <Text/>
      </div>
      {(songs && songs.length > 0)?<div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <div>
            <button onClick={()=> navigate('/PanelAdmin/Artistas/Crear')} className='glow-on-hover' style = {{left: 1000}}><Award/>Agregar nuevo artista</button>
          </div>
          <div>
            <input type='text' placeholder="🔎 Buscar" value={searchValue} onChange={e => setSearchValue(e.target.value)} style={{backgroundColor: 'rgba(0,0,0,0.0)', color: 'white', fontSize: 30, right: 50,border: '0px solid black'}}></input>
          </div>
        </div>
        <div className="cards">
          {
            artistas
            .filter(i => i.nombre.match(new RegExp(searchValue, "i")))
            .map((i,k)=>{
              console.log(i.nombre);
              return <Card key = {k} nombre={i.nombre} logo = {i.logo} idartista ={i.id}/>
            })
          }
        </div></div> : <div style={{fontSize: 50, color: 'white',paddingLeft: 50, paddingTop: 200}}>No hay artistas registrados          <div>
            <button onClick={()=> navigate('/PanelAdmin/Artistas/Crear')} ><Award/>Agregar nuevo artista</button>
          </div></div>
      }
    </div>
  );
}

export default ArtistasConsultar;

if (document.getElementById('adminartistas')) {
    ReactDOM.render(<ArtistasConsultar />, document.getElementById('adminartistas'));
}

