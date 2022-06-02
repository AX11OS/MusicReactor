import React,{useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useSpring, animated } from 'react-spring';
import {Award, Search} from 'react-bootstrap-icons';
import {useNavigate} from 'react-router-dom';
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
              Add Gender
          </animated.div>
      </div>
}

function GendersCrear() {
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

  const changeHandler = value => {
    setPais(value);
    console.log(value);
  }
  const inputProps = {
      inputStyle: 'box',
      labelStyle: 'stacked',
      placeholder: 'Please select...'
  };
  const fileTypes = ["JPG", "PNG"];
  useEffect(() => {}, []);
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

  const agregarArtista = async (e) => {
    e.preventDefault();
    if(nombre == ''){
      MySwal.fire(
        'Incomplete fields',
        'You need to fill',
        'question'
      )
      console.log("no");
    }else{
      const formData = new FormData();
      formData.append('Name', nombre)
      var url = 'http://localhost:8000/api/genders';
      
      await axios.post(url, formData).then(({data})=>{
        MySwal.fire({
          title: 'Success!',
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
        navigate('/PanelAdmin/Genders/');
      }).catch(({response})=>{
        if(response.status===422){
          setValidationError(response.data.errors)
        }else{
          MySwal.fire({
            title: 'Error while submiting:' + response,
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
    <div style ={{flexDirection: 'row', displayMode: 'flex', top: 15, padding: 30, alignItems: 'center', alignItems:'center'}}>
      <div style={{fontSize: 50, color: 'white', zIndex:1, paddingTop: 25, paddingLeft: 250}}>
        <Text/>
      </div>
      <Form style={{flexDirection: 'row', display: 'flex'}} onSubmit={agregarArtista}>
        <div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" value={nombre} onChange={(e)=> setNombre(e.target.value)} style ={{backgroundColor: 'rgba(0,0,0,0.8)', width: 430,padding: 10,textAlign: 'center',fontFamily: 'Bahnschrift',fontSize: 23, color: 'white', border: '2px solid white'}} placeholder="Gender name" />
            </Form.Group>

            <Button className='glow-on-hover' type="submit">
              Save
            </Button>
        </div>
      </Form>
    </div>

  );
}

export default GendersCrear;

if (document.getElementById('genderscrear')) {
    ReactDOM.render(<GendersCrear />, document.getElementById('genderscrear'));
}

