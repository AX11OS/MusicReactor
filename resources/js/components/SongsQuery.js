import { Modal } from 'react-bootstrap';
import React,{useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { useSpring, animated } from 'react-spring';
import {Award, Search} from 'react-bootstrap-icons';
import {useNavigate, Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash, faEdit, faAdd, faCancel } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button'
import './css/botonchido.css';
import 'react-notifications/lib/notifications.css';
import Select from 'react-select';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal)
import ModalComponent from 'react-modal-dom';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Form from 'react-bootstrap/Form'

function Text() {
  const styles = useSpring({
      from: { opacity: "0" },
      to: { opacity: "1" },
      config: { duration: "1500" }
    })
  return <div>
          <animated.div style={styles}>
              Song Book
          </animated.div>
      </div>
}


function SongsQuery() {
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);
  const [artistas, setArtistas] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchArtist, setSearchArtist] = useState("");
  const [searchAlbum, setSearchAlbum] = useState("");
  const [considerAlbum, setConsiderAlbum] = useState("");
  const [options, setOptions] = useState("");
  const [options2, setOptions2] = useState("");
  const [modal, setModal] = useState(false);
  useEffect(() => {
    loadSongs()
  }, []);

  const loadlist=async()=>{
    var url = 'http://localhost:8000/api/allofsongs';
    await axios.get(url).then(({data})=>{
        setSongs(data)
    })
  }
  const loadSongs = async () => {
    var url = 'http://localhost:8000/api/allofsongs';
    await axios.get(url).then(({data})=>{
        setSongs(data)
        console.log(data)
    })
    var url2 = 'http://localhost:8000/api/albums';
    await axios.get(url2).then(({data})=>{
        setAlbums(data)
        if(data && data.length >0){
          data.map(i =>{
            setOptions(old => [...old, {value: i.nombre, label: <div><img src={`./storage/albums/cover/${i.cover}`} style={{width: 50, left: 5,height: 50, borderRadius: 50}}/>{i.nombre} </div>}])
            setOptions2(old => [...old, {value: i.id, label: <div><img src={`./storage/albums/cover/${i.cover}`} style={{width: 50, left: 5,height: 50, borderRadius: 50}}/>{i.nombre} </div>}])
          })
        }
    })
    var url3 = 'http://localhost:8000/api/artistas';
    await axios.get(url3).then(({data})=>{
        setArtistas(data)
    })
    
  }
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted white',
      color: state.isSelected ? 'black' : 'white',
      backgroundColor: state.isSelected ? 'white' : 'black',
      padding: 20,
    }),
    control: () => ({
     placeholder: 'Search by artist'
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      return { ...provided, opacity, transition };
    }
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
      loadlist()
    }).catch(({response:{data}})=>{
      console.log("NOOOO");
      MySwal.fire({
        title: 'We foudn and error: ' + data ,
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


  const addSongs=()=>{

  }

  return (
    <div>
      <div style={{fontSize: 50, color: 'white', zIndex:1, paddingTop: 25, paddingLeft: 250}}>
        <Text/>
      </div>
      {(songs && songs.length > 0)?<div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <div>
            <button onClick={()=> {setModal(true)}} className='glow-on-hover' style = {{left: 1000, top: -30}}><FontAwesomeIcon icon ={faAdd}/>Add a song</button>
          </div>
          <div>
            <input type='text' placeholder="🔎 Search song" value={searchValue} onChange={e => setSearchValue(e.target.value)} style={{backgroundColor: 'rgba(0,0,0,0.0)', color: 'white', fontSize: 15, right: 50,border: '0px solid black'}}></input>
            <input type='text' placeholder="🔎 Search artist" value={searchArtist} onChange={e => setSearchArtist(e.target.value)} style={{backgroundColor: 'rgba(0,0,0,0.0)', color: 'white', fontSize: 15, right: 50,border: '0px solid black'}}></input>
            <button className='btn-6' onClick={()=> setSearchAlbum('')}><FontAwesomeIcon icon = {faCancel}/> </button>
            <Form.Group className="mb-3" style={{backgroundColor: 'rgba(0,0,0,0.8)', width: 430,padding: 10,textAlign: 'center',fontFamily: 'Bahnschrift',fontSize: 23, color: 'white', border: '2px solid white'}} controlId="formBasicPassword">
              <Select options={options} placeholder="Search by album" styles={customStyles} value={searchAlbum}  onChange={(value)=> {{setSearchAlbum(value), console.log(searchAlbum.value)}}} />
            </Form.Group>
          </div>
        </div>
        <Table style={{backgroundColor: 'black', borderRadius: 20, color:'white'}}>
          <Thead style={{fontSize: 18}}>
            <Tr>
              <Th>Song ID</Th>
              <Th>Cover</Th>
              <Th>Song Name</Th>
              <Th>Album Name</Th>
              <Th>Artist Name</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody style={{fontSize: '14'}}>
          {
            songs
            .filter(i => i.songname.match(new RegExp(searchValue, "i")))
            .filter(i => i.artistname.match(new RegExp(searchArtist, "i")))
            .filter(i => i.albumname.match(new RegExp(searchAlbum.value, "i")))
            .map((i,k)=>{
              return(
              <Tr key={k}>
                <Td>{i.idsong}</Td>
                <Td><img style ={{maxWidth: 50, width: 50, height: 'auto', borderRadius:30}} src ={`./storage/albums/cover/${i.cover}`}/></Td>
                <Td>{i.songname}</Td>
                <Td>{i.albumname}</Td>
                <Td>{i.artistname}</Td>
                <Td><button className="btn-5"><Link  to={`/PanelAdmin/Songs/Edit/${i.idsong}`} style={{color: 'white'}}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></Link></button></Td>
                <Td><button className="btn-6" onClick={()=>borrar(i.idsong)}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button></Td>
              </Tr>)
              
            })
          }
          </Tbody>
        </Table>

</div> : <div style={{fontSize: 50, color: 'white',paddingLeft: 50, paddingTop: 200}}>There is no songs in our database <div>
            <button onClick={()=> navigate('/PanelAdmin/Songs/Create')} ><Award/>Add a song</button>
          </div></div>
      }
        <Modal
        show={modal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{color: 'white', backgroundColor: 'black'}}>Please, first select an album to add songs</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor: 'black'}}>
          <div style={{alignContent: 'center', alignItems: 'center'}}>
          <Form.Group className="mb-3" style={{backgroundColor: 'rgba(0,0,0,0.8)', width: 430,padding: 10,textAlign: 'center',fontFamily: 'Bahnschrift',fontSize: 23, color: 'white', border: '2px solid white'}} controlId="formBasicPassword">
              <Select options={options2} placeholder="Search album to add songs" styles={customStyles} value={considerAlbum}  onChange={(value)=> {{setConsiderAlbum(value), console.log(considerAlbum.value)}}} />
            </Form.Group>
           </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className='glow-on-hover' onClick={addSongs()}>
          <Link  to={`/PanelAdmin/Songs/Create/${considerAlbum.value}`} style={{color: 'white'}}>
            Continue
            </Link>
          </Button>
          <Button className='glow-on-hover' onClick={()=> setModal(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SongsQuery;

if (document.getElementById('songsquery')) {
    ReactDOM.render(<SongsQuery />, document.getElementById('songsquery'));
}

