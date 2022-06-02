import React,{useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { useSpring, animated } from 'react-spring';
import {Award, Search} from 'react-bootstrap-icons';
import {useNavigate, Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import './css/botonchido.css';
import 'react-notifications/lib/notifications.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal)
import randomColor from "randomcolor";

function Text() {
  const styles = useSpring({
      from: { opacity: "0" },
      to: { opacity: "1" },
      config: { duration: "1500" }
    })
  return <div>
          <animated.div style={styles}>
              Genders
          </animated.div>
      </div>
}


export default function GendersConsultar() {
  const navigate = useNavigate();
  const [artistas, setArtistas] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    consultaArtistas()
  }, []);

  const consultaArtistas = async () => {
    var url = 'http://localhost:8000/api/genders';
    await axios.get(url).then(({data})=>{
        setArtistas(data)
    })
  }

  const Card=(props)=>{
    console.log("Props : " + props.nombre);
    let color = randomColor();
    console.log(color);
    return(
      <div style={{textAlign: 'center', color: 'white', alignContent: 'center', maxWidth:'100px',borderRadius: 50, backgroundColor: color}}>
        <p>{props.nombre}</p>
        <div style = {{top: -10}}>
          <button className='btn-5'><Link  to={`/PanelAdmin/Genders/Editar/${props.idgender}`} style={{color: 'white'}}> <FontAwesomeIcon icon={faEdit} /></Link></button>
          {'   '}
          <button className='btn-6' onClick={()=> borrar(props.idgender)}> <FontAwesomeIcon icon={faTrash}/></button>
        </div>
      </div>
    );
  }
  

  const borrar = async (_idGender)=>{
    const url = `http://localhost:8000/api/genders/${_idGender}`;
    await axios.delete(url).then(({data})=>{
      MySwal.fire({
        title: 'Deleted! OwO',
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
        title: 'Error while deleting: ' + response ,
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
      {(artistas && artistas.length > 0)?<div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <div>
            <button onClick={()=> navigate('/PanelAdmin/Genders/Crear')} className='glow-on-hover' style = {{left: 1000}}><Award/>Add new gender</button>
          </div>
          <div>
            <input type='text' placeholder="🔎 Search" value={searchValue} onChange={e => setSearchValue(e.target.value)} style={{backgroundColor: 'rgba(0,0,0,0.0)', color: 'white', fontSize: 30, right: 50,border: '0px solid black'}}></input>
          </div>
        </div>
        <div className="cards">
          {
            artistas
            .filter(i => i.Name.match(new RegExp(searchValue, "i")))
            .map((i,k)=>{
              console.log(i.Name);
              return <Card key = {k} nombre={i.Name}  idgender ={i.id}/>
            })
          }
        </div></div> : <div style={{fontSize: 50, color: 'white',paddingLeft: 50, paddingTop: 200}}>No genders registered         <div>
            <button onClick={()=> navigate('/PanelAdmin/Artistas/Crear')} ><Award/>Add new gender</button>
          </div></div>
      }
    </div>
  );
}


