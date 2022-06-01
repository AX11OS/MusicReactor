import React, {useState} from 'react';
import { useSpring, animated } from 'react-spring';


function Text() {
    const styles = useSpring({
        from: { opacity: "0" },
        to: { opacity: "1" },
        config: { duration: "1000" }
      })
    return <div>
            <animated.div style={styles}>
                Escuchados recientemente
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
                Recomendados para tí
            </animated.div>
        </div>
  }

export default function ClientPlaylist(){
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