import React, {useState} from 'react';
import { useSpring, animated } from 'react-spring';
import Form from 'react-bootstrap/Form';
import {faTrash, faPlay, faPause} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
                You haven't any favorites yet.
            </animated.div>
        </div>
  }

export default function ClientFavs({updateCore}){
    const [favorites, setFavorites] = useState([]);

    const sendCore =(index)=>{
        updateCore(favorites, index);
    }

    const Card =(props)=>{
        return(
            <div style={{color: 'white', width: '90vw', borderTop: '1px solid white', borderBottom: '1px solid white'}}>
                <div>

                    <button onPress={()=> sendCore(props.index)}><FontAwesomeIcon icon={faPlay}></FontAwesomeIcon></button>
                </div>
                <div>
                    <img style = {{borderRadius: '100%', height:40, width: 40}} src={`./storage/albums/cover/${props.cover}`}/>
                </div>
                <div>
                    {props.song}
                </div>
                <div>
                    {props.artist}
                </div>
                <div>
                    {props.album}
                </div>
                <div>
                    <button><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>
                </div>
            </div>
        );
    }
    return(
        <Form>
            <div style={{fontSize: 30, color: 'white', paddingLeft: 20}}>
                {(favorites && favorites.length > 0)? <div><Text/>
                    <div>
                        {favorites.map((i, index)=>{
                                return <Card song={i.song} artist={i.artist} album={i.album} index = {index} cover={i.cover}/>
                            })
                        }
                    </div>
                </div>: <div><Recomendar/>
                </div> }
            
            
            </div>
        </Form>
    );
}