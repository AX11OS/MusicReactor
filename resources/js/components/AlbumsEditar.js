import React,{useState, useEffect, useMemo } from 'react';
import { useSpring, animated } from 'react-spring';
import {useNavigate,useParams} from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import { FileUploader } from "react-drag-drop-files";
import './css/botonchido.css';
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
              Editar Album
          </animated.div>
      </div>
}

export default function AlbumsEditar() {
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [nombre, setNombre] = useState('');
  const [cover, setCover] = useState(null);
  const [idBanda, setidBanda] = useState('');
  const [anio, setAnio] = useState('');
  const [years, setYears] = useState([]);
  const [URLcover, setURLcover] = useState('./images/image2vector.svg');
  const MySwal = withReactContent(Swal)
  const { id } = useParams()

  const changeHandler = value => {
    setidBanda(value);
    console.log(value);
  }

  const fileTypes = ["JPG", "PNG"];
  useEffect(() => { consultaArtistas(),
    cargarAlbum()
  }, []);

  const cargarAlbum = async () =>{
    const url = `http://localhost:8000/api/albums/cover/${id}`;
      await axios.get(url).then(({data})=>{
        const { nombre, 
          anio, 
          cover, 
          id_artista } = data.album
          console.log(nombre);
        setNombre(nombre)
        setAnio(anio)
        setURLcover(`./storage/albums/${cover}`)
        setidBanda(id_artista)
      }).catch(({response:{data}})=>{
        Swal.fire({
          text:data.message,
          icon:"error"
        })
      })
    
  }
  const consultaArtistas = async () => {
    var url = 'http://localhost:8000/api/artistas';
    await axios.get(url).then(({data})=>{
        if(data && data.length >0){
          data.map(i =>{
            setOptions(old => [...old, {value: i.id, label: <div><img src={`./storage/artistas/logo/${i.logo}`} style={{width: 50, left: 5,height: 50, borderRadius: 50}}/>{i.nombre} </div>}])
          })
        }
    })
    for(var x = 2022; x > 1800; x--){
      setYears(old => [...old, {value: x, label: x}])
    }
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
     placeholder: 'Related Artist'
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
      color: state.isSelected ? 'black' : 'white',
      backgroundColor: state.isSelected ? 'white' : 'black',
      padding: 20,
    }),
    control: () => ({
     placeholder: 'Related Artist'
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      return { ...provided, opacity, transition };
    }
  }

  const agregarAlbum = async (e) => {
    e.preventDefault();
    if(nombre == '' || idBanda == '' || anio == '' || cover == null){
      MySwal.fire(
        'Incomplete Fields',
        'You must to fill all fields',
        'question'
      )
      console.log("no");
    }else{
      const formData = new FormData();
      console.log(idBanda.label)
      formData.append('nombre', nombre)
      formData.append('cover', cover)
      formData.append('anio', anio.value)
      formData.append('id_artista', idBanda.value)
      var url = 'http://localhost:8000/api/albums';
      
      await axios.post(url, formData).then(({data})=>{
        MySwal.fire({
          title: 'Éxito al guardar',
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
        navigate('/PanelAdmin/Albums/');
      }).catch(({response})=>{
        if(response.status===422){
          setValidationError(response.data.errors)
        }else{
          MySwal.fire({
            title: 'Error al realizar la petición:' + response,
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
      <Form style={{flexDirection: 'row', display: 'flex'}} onSubmit={agregarAlbum}>
        <div>
            <Form.Group className="mb-3" >
              <Form.Control type="text" value={nombre} onChange={(e)=> setNombre(e.target.value)} style ={{backgroundColor: 'rgba(0,0,0,0.8)', width: 430,padding: 10,textAlign: 'center',fontFamily: 'Bahnschrift',fontSize: 23, color: 'white', border: '2px solid white'}} placeholder="Nombre del álbum" />
            </Form.Group>

            <Form.Group className="mb-3" style={{backgroundColor: 'rgba(0,0,0,0.8)', width: 430,padding: 10,textAlign: 'center',fontFamily: 'Bahnschrift',fontSize: 23, color: 'white', border: '2px solid white'}} controlId="formBasicPassword">
              <Select options={options} placeholder="Related artist" styles={customStyles} value={idBanda}  onChange={changeHandler} />
            </Form.Group>

            <Form.Group className="mb-3" style={{backgroundColor: 'rgba(0,0,0,0.8)', width: 430,padding: 10,textAlign: 'center',fontFamily: 'Bahnschrift',fontSize: 23, color: 'white', border: '2px solid white'}} controlId="formBasicPassword">
              <Select options={years} placeholder="Year" styles={customStyles2} value={anio}  onChange={(value)=> setAnio(value)} />
            </Form.Group>
            <Button className='glow-on-hover' type="submit">
              Guardar datos
            </Button>
        </div>
        <div style={{marginLeft: 20, alignContent: 'center'}}>
          <Form.Group className="mb-3">
            <FileUploader label={"Album cover"} hoverTitle ={'Drop here'} handleChange={(file) => { setCover(file), setURLcover(URL.createObjectURL(file)),console.log(file)}} name="file" types={fileTypes} />
          </Form.Group>
          <Form.Group>
            <img style={{width: 400, height:400, backgroundColor: 'rgba(0,0,0,0.7)', border:'2px solid white'}} src={URLcover}></img>
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

