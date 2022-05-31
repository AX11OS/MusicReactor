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


export default function AlbumsConsultar() {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [bandaValue, setBandaValue] = useState("");

  useEffect(() => {
    consultaAlbums()
  }, []);

  const consultaAlbums = async () => {
    var url = 'http://localhost:8000/api/getAlbums';
    await axios.get(url).then(({data})=>{
        setAlbums(data)
    })
  }

  const Card=(props)=>{
    console.log("Props : " + props.nombre);
    return(
      <div style={{textAlign: 'center', color: 'white', alignContent: 'center', maxWidth:'100px'}}>
        <img style ={{maxWidth: '100px', width: '100%', height: 'auto'}} src ={`./storage/albums/cover/${props.cover}`}/>
        <p>{props.nombre}</p>
        <p>{props.banda}</p>
        <div style = {{top: -10}}>
          <button className='btn-5'><Link  to={`/PanelAdmin/Albums/Editar/${props.idalbum}`} style={{color: 'white'}}> <FontAwesomeIcon icon={faEdit} /></Link></button>
          {'   '}
          <button className='btn-6' onClick={()=> borrar(props.idartista)}> <FontAwesomeIcon icon={faTrash}/></button>
        </div>
      </div>
    );
  }
  

  const borrar = async (_idalbum)=>{
    const url = `http://localhost:8000/api/albums/${_idalbum}`;
    await axios.delete(url).then(({data})=>{
      MySwal.fire({
        title: 'Borrado exitoso',
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
        title: 'Error al borrar: ' + response ,
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
      {(albums && albums.length > 0)?<div>
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
            albums
            .filter(i => i.nombre.match(new RegExp(searchValue, "i")))
            .filter(i => i.banda.match(new RegExp(bandaValue, "i")))
            .map((i,k)=>{
              console.log(i.nombre);
              return <Card key = {k} nombre={i.nombre} logo = {i.logo} idartista ={i.id}/>
            })
          }
        </div></div> : <div style={{fontSize: 50, color: 'white',paddingLeft: 50, paddingTop: 200}}>No hay álbums registrados          <div>
            <button onClick={()=> navigate('/PanelAdmin/Albums/Crear')} ><Award/>Agregar nuevo álbum</button>
          </div></div>
      }
    </div>
  );
}

