import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';


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
    const [recientes, setRecientes] = useState([]);
    const [recomendados, setRecomendados] = useState([]);

    return(
        <div>
            <div style={{fontSize: 30, color: 'white', paddingLeft: 20}}>
                {(recientes.length>0 && recientes)? <div><Text/><Recomendar/></div>: <Recomendar></Recomendar> }
            </div>
        </div>
    );
}