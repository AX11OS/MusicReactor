import React,{useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useSpring, animated } from 'react-spring';
import {Award, Search} from 'react-bootstrap-icons';
import {useNavigate,useParams} from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import countryList from 'react-select-country-list';
import Select from 'react-select';
import { FileUploader } from "react-drag-drop-files";
import './css/botonchido.css';
import { useAlert } from "react-alert";
import AlertTemplate from 'react-alert-template-basic';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
function Text() {
  const styles = useSpring({
      from: { opacity: "0" },
      to: { opacity: "1" },
      config: { duration: "2000" }
    })
  return <div>
          <animated.div style={styles}>
              Edit Artist
          </animated.div>
      </div>
}

function ArtistasEditar() {
  const navigate = useNavigate();
  const options = useMemo(() => countryList().getData(), [])
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [logo, setLogo] = useState(null);
  const [banda, setBanda] = useState(null);
  const [pais, setPais] = useState('');
  const [URLbanda, setURLBanda] = useState('./images/Splash1.png');
  const [URLlogo, setURLlogo] = useState('./images/image2vector.svg');
  const MySwal = withReactContent(Swal)
  const { id } = useParams()

  const changeHandler = value => {
    setPais(value);
    console.log(value);
  }
  const inputProps = {
      inputStyle: 'box',
      labelStyle: 'stacked',
      placeholder: 'Please select...'
  };
  const cargarArtista = async () =>{
    const url = `http://localhost:8000/api/artistas/${id}`;
      await axios.get(url).then(({data})=>{
        const { nombre, 
          pais, 
          descripcion, 
          banda, 
          logo } = data.artista
        setNombre(nombre)
        setPais(pais)
        setDescripcion(descripcion)
        setURLBanda(`./storage/artistas/banda/${banda}`)
        setURLlogo(`./storage/artistas/logo/${logo}`)
      }).catch(({response:{data}})=>{
        Swal.fire({
          text:data.message,
          icon:"error"
        })
      })
    
  }
  const fileTypes = ["JPG", "PNG"];
  useEffect(() => {
    cargarArtista()
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
     placeholder: 'Pa??s de or??gen'
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      return { ...provided, opacity, transition };
    }
  }

  const actualizarArtista = async (e) => {
    e.preventDefault();
    if(nombre == '' || pais.label == '' || descripcion == ''){
      MySwal.fire(
        'Incomplete form',
        'Please, fill all the form!',
        'question'
      )
      console.log("no");
    }else{
      const formData = new FormData();
      formData.append('_method', 'PATCH');
      formData.append('nombre', nombre)
      formData.append('pais', pais.label)
      formData.append('descripcion', descripcion)
      if(banda!= null) formData.append('banda', banda)
      if(logo!=null) formData.append('logo', logo)

      var url =`http://localhost:8000/api/artistas/${id}`;
      
      await axios.post(url, formData).then(({data})=>{
        MySwal.fire({
          title: '??xito al actualizar',
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
        navigate('/PanelAdmin/Artistas/');
      }).catch(({response})=>{
        if(response.status===422){
          setValidationError(response.data.errors)
        }else{
          MySwal.fire({
            title: 'Error al realizar la petici??n:' + response.data,
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
      <Form style={{flexDirection: 'row', display: 'flex'}} onSubmit={actualizarArtista}>
        <div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" value={nombre} onChange={(e)=> setNombre(e.target.value)} style ={{backgroundColor: 'rgba(0,0,0,0.8)', width: 430,padding: 10,textAlign: 'center',fontFamily: 'Bahnschrift',fontSize: 23, color: 'white', border: '2px solid white'}} placeholder="Nombre del artista" />
            </Form.Group>

            <Form.Group className="mb-3" style={{backgroundColor: 'rgba(0,0,0,0.8)', width: 430,padding: 10,textAlign: 'center',fontFamily: 'Bahnschrift',fontSize: 23, color: 'white', border: '2px solid white'}} controlId="formBasicPassword">
              <Select options={options} placeholder="Pa??s de or??gen" styles={customStyles} value={pais}  onChange={changeHandler} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control as="textarea" rows="3" value={descripcion} onChange={(e)=> setDescripcion(e.target.value)} style ={{backgroundColor: 'rgba(0,0,0,0.8)', width: 430,padding: 10,textAlign: 'center', height: 200, fontFamily: 'Bahnschrift',fontSize: 23, color: 'white', border: '2px solid white'}} placeholder="Info" />
            </Form.Group>
        </div>
        <div style={{marginLeft: 20, alignContent: 'center'}}>
          <Form.Group className="mb-3">
            <FileUploader label={"Artist Image"} hoverTitle ={'Drop here'} handleChange={(file) => { setBanda(file), setURLBanda(URL.createObjectURL(file)),console.log(file)}} name="file" types={fileTypes} />
          </Form.Group>
          <Form.Group>
            <img style={{width: 430, height:333, backgroundColor: 'rgba(0,0,0,0.7)', border:'2px solid white'}} src={URLbanda}></img>
          </Form.Group>
          <Button className='glow-on-hover' type="submit">
              Update
            </Button>
        </div>
        <div style={{marginLeft: 20}}>
          <Form.Group className="mb-3">
            <FileUploader label={"Artist Logo"} hoverTitle ={'Drop here'} handleChange={(file) =>  {setLogo(file), setURLlogo(URL.createObjectURL(file)),console.log(file)}} name="file" types={fileTypes} />
          </Form.Group>
          <Form.Group>
            <img style={{width: 333, height:333, backgroundColor: 'rgba(0,0,0,0.7)', border:'2px solid white'}} src={URLlogo}></img>
          </Form.Group>
        </div>

      </Form>

      <div>

      </div>
      <div>

      </div>
    </div>

  );
}

export default ArtistasEditar;

if (document.getElementById('artistaseditar')) {
    ReactDOM.render(<ArtistasEditar />, document.getElementById('artistaseditar'));
}

