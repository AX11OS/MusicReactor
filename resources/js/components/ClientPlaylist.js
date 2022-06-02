import React, {useState, useEffect} from 'react';
import { useSpring, animated } from 'react-spring';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash, faPlay, faPause, faCancel } from '@fortawesome/free-solid-svg-icons';
import './css/botonplay.css';
import Lottie from 'react-lottie';
import * as pause from './anims/pause.json';
import * as play from './anims/play.json';
import * as bars from './anims/bars.json';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

function Text() {
    const styles = useSpring({
        from: { opacity: "0" },
        to: { opacity: "1" },
        config: { duration: "1000" }
      })
    return <div>
            <animated.div style={styles}>
                You haven't any element in your playlist yet.
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
                Your playlist
            </animated.div>
        </div>
  }

export default function ClientPlaylist({updateCore, updateIndex, updatePlay, isPlay}){
    const [playlist, setPlaylist] = useState([]);
    const [onPlay, setOnPlay] = useState();
    const MySwal = withReactContent(Swal)
    
    useEffect(() => {
        loadplay()
      }, []);
    
      const loadplay = async () => {
        var url = 'http://localhost:8000/api/userplay/3';
        await axios.get(url).then(({data})=>{
            setPlaylist(data)
        })
      }
      const barsOptions = {
        loop: true,
        autoplay: true, 
        animationData: bars,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };

    return(
        <div>
            <div style={{fontSize: 30, color: 'white', paddingLeft: 20}}>
                {(playlist.length>0 && playlist)? <div><Recomendar/>
                <>
                <Table style={{fontSize: 13, width: '70vw',backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 20, color:'white', borderTop:'1px solid white',paddingLeft: 15, paddingRight: 15}}>
                    <Tbody style={{fontSize: '14'}}>
                    {
                        playlist
                        .map((i,index)=>{
                        return(
                        <Tr key={index}>
                            <Td><button className="glow-on-hover2" onClick={()=> {(onPlay==index)? setOnPlay(): setOnPlay(index), updateCore(playlist), (isPlay)? updatePlay(false):updatePlay(true),updateIndex(index)} }><FontAwesomeIcon icon ={(index==onPlay && isPlay)? faPause:faPlay }/></button></Td>
                            <Td><img style ={{maxWidth: 50, width: 50, height: 'auto',  borderTop:'1px solid white', borderBottom:'1px solid white',borderRadius:30}} src ={`./storage/albums/cover/${i.cover}`}/></Td>
                            <Td>{i.name}</Td>
                            <Td>{i.artist}</Td>
                            <Td>{i.albumname}</Td>
                            <Td>{i.artistname}</Td>
                            <Td>{(onPlay==index && isPlay ) ?<Lottie className = "bars" options={barsOptions} height={30} width={30}/>: <div style={{width: 50, height: 50}}></div> }</Td>
                            <Td><button className="btn-6" onClick={()=>borrar(i.idsong)}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button></Td>
                        </Tr>)
                        
                        })
                    }
                    </Tbody>
                    </Table>
                </></div>: <Text/> }
            </div>
        </div>
    );
}