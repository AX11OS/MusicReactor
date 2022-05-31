import React, {useState} from 'react';
import { useSpring, animated } from 'react-spring';
import Form from 'react-bootstrap/Form';

function Text() {
    const styles = useSpring({
        from: { opacity: "0" },
        to: { opacity: "1" },
        config: { duration: "1000" }
      })
    return <div>
            <animated.div style={styles}>
                My Favorites
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
                You haven't any favorites.
            </animated.div>
        </div>
  }

export default function ClienteInicio(){
    const [favorites, setFavorites] = useState([]);

    return(
        <div>
            <div style={{fontSize: 30, color: 'white', paddingLeft: 20}}>
                {(favorites && favorites.length > 0)? <div><Text/>
                    <Form>

                    </Form>
                </div>: <Recomendar></Recomendar> }
            
            
            </div>
        </div>
    );
}