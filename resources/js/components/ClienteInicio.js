import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import {useNavigate} from 'react-router-dom';


function Text() {
    const styles = useSpring({
        from: { opacity: "0" },
        to: { opacity: "1" },
        config: { duration: "1000" }
      })
    return <div>
            <animated.div style={styles}>
                Recently listened to.
            </animated.div>
        </div>
  }
  function Recomendar() {
    const styles = useSpring({
        from: { opacity: "0" },
        to: { opacity: "1" },
        config: { duration: "1000" }
      })
    return <div>
            <animated.div style={styles}>
                Recommended for you.
            </animated.div>
        </div>
  }

export default function ClienteInicio(){
    const navigate = useNavigate();
    const [recientes, setRecientes] = useState([]);
    const [recomendados, setRecomendados] = useState([]);
    const [searched, setSearched] = useState('')

    return(
        <div>
            <div style={{fontSize: 30, color: 'white', paddingLeft: 20}}>
                {(recientes.length>0 && recientes)? <div><Text/><Recomendar/></div>: <Recomendar></Recomendar> }
            </div>
            <div>
                <input type="text" onKeyPress={(e)=>{  if(e.key === 'Enter'){   navigate('./Search/'+searched)
        }}} style={{borderRadius: 30, fontSize: 25, marginLeft: 10, backgroundColor: 'rgba(0,0,0,0.2)',color: 'white'}}placeholder='Search anything' value={searched} onChange={(e)=> setSearched(e.target.value) }></input>
            </div>
        </div>
    );
}