import React,{useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useSpring, animated } from 'react-spring';
import {useNavigate, useParams} from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import { FileUploader } from "react-drag-drop-files";
import './css/botonchido.css';
import './css/app.css'
import 'react-notifications/lib/notifications.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faForward, faBackward} from '@fortawesome/free-solid-svg-icons'
function Text() {
  const styles = useSpring({
      from: { opacity: "0" },
      to: { opacity: "1" },
      config: { duration: "2000" }
    })
  return <div>
          <animated.div style={styles}>
              Add Songs
          </animated.div>
      </div>
}

export default function SongsCreate() {
  const navigate = useNavigate();
  const [name, setName] = useState([]);
  const [id_artist, setId_artist] = useState('');
  const [id_genre, setId_genre] = useState([]);
  const [duration, setDuration] = useState([]);
  const [files, setFiles] = useState([]);
  const { id } = useParams()
  const MySwal = withReactContent(Swal)
  const [index, setIndex] = useState(0)
  const fileTypes = ["MP3"];
  const [genres, setGenres] = useState([]);
  const [artist, setArtist] =useState('');
  const [album, setAlbum] = useState('');
  const [cover, setCover] = useState('');
  const [modal, setModal] = useState(false);
  const [dis,setDis] = useState(true);
  const [dos,setDos] = useState(false);
  const launchMessage=()=>{
    MySwal.fire({
      title: 'Incorret format. Only MP3',
      width: 600,
      padding: '3em',
      color: '#FFF',
      icon: 'error',
      background: '#000000',
      backdrop: `
        rgba(125,0,0,0.3)
        left top
        no-repeat
      `
    })
  }

  const loadGenres = async()=>{
    var url = 'http://localhost:8000/api/genders';
    await axios.get(url).then(({data})=>{
        if(data && data.length >0){
          data.map(i =>{
            setGenres(old => [...old, {value: i.id, label: i.Name}])
          })
        }
    })
  }
  const loadData =async()=>{
    var url = 'http://localhost:8000/api/loadalbum/';
    await axios.get(url+id).then(({data})=>{
      const {banda, nombre, id_artista,cover} = data[0];
      setId_artist(id_artista);
      setArtist(banda);
      setAlbum(nombre);
      setCover(cover);
    })
  }
  useEffect(() => {
    loadGenres(),
    loadData()
  }, []);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted white',
      color: state.isSelected ? 'black' : 'white',
      backgroundColor: state.isSelected ? 'white' : 'black',
      padding: 20,
    }),
    control: () => ({
     placeholder: 'País de orígen'
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      return { ...provided, opacity, transition };
    }
  }
  const customStyles2 = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted white',
      color: state.isSelected ? 'white' : 'black',
      backgroundColor: state.isSelected ? 'black' : 'white',
      padding: 20,
    }),
    control: () => ({
     placeholder: 'País de orígen'
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      return { ...provided, opacity, transition };
    }
  }
  const DynamicForms=()=>{
    
    const back=()=>{
      setDos(false)
      if(index == 0){
        setDis(true)
      }else{
        setIndex(index-1)
        setDis(false)
      }
      console.log(dis)
    }
    const forward=()=>{
      setDis(false)
      if(index == files.length-1){
        setDos(true)
      }else{
        setIndex(index+1)
        setDos(false)
      }
      console.log(dos)
    }
    const updateName = (XD) =>{
      const newState = [...name];
      newState[index] = XD;
      setName(newState);
    }

    return(
      <div style={{alignContent:'center'}}>
        <div style={{fontSize: 18}}>File {index+1} {files[index].name}</div>
        <div className="mb-3" controlId="formBasicEmail">
         <input value={(name[index])? name[index] : ''}  type="text" onChange={(e)=> { updateName(e.target.value), console.log(e.target.value)}} style ={{backgroundColor: 'rgba(0,0,0,0.8)', width: 430,padding: 10,textAlign: 'center',fontFamily: 'Bahnschrift',fontSize: 23, color: 'white', border: '2px solid white'}} placeholder="Song name" />
        </div>
        <div className="mb-3" style={{backgroundColor: 'rgba(0,0,0,0.8)', width: 430,padding: 10,textAlign: 'center',fontFamily: 'Bahnschrift',fontSize: 23, color: 'white', border: '2px solid white'}} controlId="formBasicPassword">
          <Select options={genres} placeholder="Song's genre" styles={customStyles2} value={(id_genre[index])? id_genre[index] : ''}  onChange={(value)=>{console.log(value), setId_genre(datas=>({...datas,[index]: value}))}} />
        </div>
        <div>
          <button className="glow-on-hover" disabled={dis} onClick={()=> back() }><FontAwesomeIcon icon={faBackward}/></button>{'    '} <button className="glow-on-hover" disabled={dos} onClick={()=> forward() }><FontAwesomeIcon icon={faForward}/></button>
        </div>
      </div>
    )
  }


  const addSongs = async () => {

    var continued = true;
    if(files && files.length>0){
      for(var x = 0; x < files.length;x++){
        if(name[x] == '' || id_genre[x] == ''){
          MySwal.fire(
            'Incomplete fields',
            'You must fill all fields',
            'question'
          )
          continued = false;
          console.log("no");
        }
      }
        if(continued){
          var crash = 0;
          for(var x = 0; x < files.length;x++){
            const formData = new FormData();
            formData.append('name', name[x])
            formData.append('id_artist', id_artist)
            formData.append('id_album', id)
            formData.append('id_gender', id_genre[x].value)
            console.log(files[x])
            formData.append('song',files[x])
            var url = 'http://localhost:8000/api/songs';
            
            await axios.post(url, formData).then(({data})=>{

            }).catch(({response})=>{
              if(response.status===422){
                setValidationError(response.data.errors)
              }else{
                  crash++;
              }
            })
          }
          if(crash == 0 ){
            MySwal.fire({
              title: 'All songs saved!',
              width: 600,
              padding: '3em',
              color: '#FFF',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
              background: '#000000',
              backdrop: `
                rgba(0,125,0,0.3)
                left top
                no-repeat
              `
            })
            navigate('/PanelAdmin/Songs/');
          }else{
            MySwal.fire({
              title: 'Error while adding songs.',
              width: 600,
              padding: '3em',
              color: '#FFF',
              icon: 'error',
              background: '#000000',
              backdrop: `
                rgba(125,0,0,0.3)
                left top
                no-repeat
              `
            })
          }
        }
      }
  }
  
  return (
    <div style ={{flexDirection: 'row', displayMode: 'flex', top: 15, padding: 30}}>
      <div style={{fontSize: 50, color: 'white', zIndex:1, paddingTop: 25, paddingLeft: 250}}>
        <Text/>
      </div>
      <Form style={{flexDirection: 'row', display: 'flex'}} onSubmit={()=> navigate('/Songs/')}>
        <div>
            <Form.Group className="mb-3" style={{fontSize: 20, color: 'white'}} controlId="formBasicEmail">
              Artist name: {artist}
            </Form.Group>
            <Form.Group className="mb-3" style={{fontSize: 20, color: 'white'}} controlId="formBasicEmail">
              Album: {album}
            </Form.Group>
            <Form.Group className="mb-3" style={{backgroundColor: 'rgba(0,0,0,0.8)', width: 430,padding: 10,textAlign: 'center',fontFamily: 'Bahnschrift',fontSize: 23, color: 'white', border: '2px solid white'}} controlId="formBasicPassword">
              <img src={`./storage/albums/cover/${cover}`} style={{width: 300, height: 300}}/>
            </Form.Group>
        </div>
        <div style={{marginLeft: 20, alignContent: 'center'}}>
          <Form.Group className="mb-3">
            <FileUploader style={{width: 600, height: 600}}label={"Files"} onTypeError={(err)=> launchMessage()} multiple={true} hoverTitle ={'Drop here'} handleChange={(file) => { setFiles(file), console.log(file), setModal(true)}} name="file" types={fileTypes} />
          </Form.Group>
          <Button className='glow-on-hover' type="submit">
              Exit
          </Button>
        </div>
      </Form>
      <Modal
        show={modal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Saving songs</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DynamicForms/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>addSongs()}>
            Save
          </Button>
          <Button variant="primary" onClick={()=> setModal(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>

  );
}


