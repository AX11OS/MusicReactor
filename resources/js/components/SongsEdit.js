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

export default function SongsEdit() {
  const navigate = useNavigate();
  const [name, setName] = useState([]);
  const [id_gender, setId_gender] = useState('');
  const [files, setFiles] = useState();
  const { id } = useParams()
  const MySwal = withReactContent(Swal)
  const fileTypes = ["MP3"];
  const [genres, setGenres] = useState([]);
  const [artist, setArtist] =useState('');
  const [album, setAlbum] = useState('');
  const [cover, setCover] = useState('');
  const [song, setSong] = useState('');

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
    var url = 'http://localhost:8000/api/loadsong/';
    await axios.get(url+id).then(({data})=>{
      const {artist, album, name,cover, id_gender, song} = data[0];
      setArtist(artist);
      setAlbum(album);
      setCover(cover);
      setName(name);
      setId_gender(id_gender);
      setSong(song)
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

  const updateSongs = async (e) => {
    e.preventDefault();
    if(name == '' || id_gender == ''){
      MySwal.fire(
        'Incomplete fields',
        'You must fill all fields',
        'question'
      )
    }else{
        const formData = new FormData();
        formData.append('_method', 'PATCH');
        formData.append('name', name);
        formData.append('id_gender', id_gender.value)
        if(files!= null) formData.append('song',files)

        var url = `http://localhost:8000/api/songs/${id}`;
        await axios.post(url, formData).then(({data})=>{
          MySwal.fire({
            title: 'Correctly updated!',
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
        }).catch(({response})=>{
          if(response.status===422){
            setValidationError(response.data.errors)
          }else{
            MySwal.fire({
              title: 'Error while updating songs.',
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
        })
      }


  }
  
  return (
    <div style ={{flexDirection: 'row', displayMode: 'flex', top: 15, padding: 30}}>
      <div style={{fontSize: 50, color: 'white', zIndex:1, paddingTop: 25, paddingLeft: 250}}>
        <Text/>
      </div>
      <Form style={{flexDirection: 'row', display: 'flex'}} onSubmit={updateSongs}>
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
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" value={name} onChange={(e)=> setName(e.target.value)} style ={{backgroundColor: 'rgba(0,0,0,0.8)', width: 430,padding: 10,textAlign: 'center',fontFamily: 'Bahnschrift',fontSize: 23, color: 'white', border: '2px solid white'}} placeholder="Song Name" />
          </Form.Group>
          <Form.Group className="mb-3">
            <FileUploader style={{width: 600, height: 600}} label={"Optional to load another file"} onTypeError={(err)=> launchMessage()}  hoverTitle ={'Drop here'} handleChange={(file) => { setFiles(file), console.log(file)}} name="file" types={fileTypes} />
          </Form.Group>
          <Form.Group className="mb-3" style={{backgroundColor: 'rgba(0,0,0,0.8)', width: 430,padding: 10,textAlign: 'center',fontFamily: 'Bahnschrift',fontSize: 23, color: 'white', border: '2px solid white'}} controlId="formBasicPassword">
              <Select options={genres} placeholder="Select the gender" styles={customStyles} defaultValue={id_gender}  onChange={(value)=> {{setId_gender(value), console.log(id_gender.value)}}} />
          </Form.Group>
          <Button className='glow-on-hover' type="submit">
              Save update
          </Button>
        </div>
      </Form>
    </div>

  );
}

