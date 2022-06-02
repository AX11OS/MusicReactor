import React, {useState, useEffect,useRef} from 'react';
import { useSpring, useSprings,animated } from 'react-spring';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash, faPlay, faPause, faCancel } from '@fortawesome/free-solid-svg-icons';
import './css/botonplay.css';
import Lottie from 'react-lottie';
import Swal from 'sweetalert2';
import { useParams, navigation  } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content'
import { useGesture } from 'react-use-gesture';
import * as bars from './anims/bars.json';
import {Carousel} from '3d-react-carousal';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
function Text() {
    const styles = useSpring({
        from: { opacity: "0" },
        to: { opacity: "1" },
        config: { duration: "1000" }
      })
    return <div>
            <animated.div style={styles}>
               There is no albums for this artist
            </animated.div>
        </div>
  }


export default function ClientArtist({updateCore, updateIndex, updatePlay, isPlay}){
    const [albums, setAlbums] = useState([]);
    const [songs, setSongs] = useState([]);
    const [options, setOptions] = useState([])
    const [selectedAlbum, setSelectedAlbum] =useState ('')
    const [onPlay, setOnPlay] = useState();
    const MySwal = withReactContent(Swal);
    const { id } = useParams()

    const index = useRef(0)
    const  Recomendar = () => {
      const styles = useSpring({
          from: { opacity: "0" },
          to: { opacity: "1" },
          config: { duration: "1000" }
        })
      return <div>
              <animated.div style={styles}>
                  Artist
              </animated.div>
          </div>
    }
    const [props, set] = useSprings(albums.length, i => ({ x: i * window.innerWidth, sc: 1, display: 'block' }))
    const bind = useGesture(({ down, delta: [xDelta], direction: [xDir], distance, cancel }) => {
      if (down && distance > window.innerWidth / 2)
        cancel((index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, albums.length - 1)))
      set(i => {
        if (i < index.current - 1 || i > index.current + 1) return { display: 'none' }
        const x = (i - index.current) * window.innerWidth + (down ? xDelta : 0)
        const sc = down ? 1 - distance / window.innerWidth / 2 : 1
        return { x, sc, display: 'block' }
      })
    })

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

    useEffect(() => {
      loadAlbums(),
      loadSongs()
      }, []);

      const loadSongs = async () => {
        var url = 'http://localhost:8000/api/loadfromartist/'+id;
        await axios.get(url).then(({data})=>{
            setSongs(data)
        })
      }
      const loadAlbums = async () => {
        var url = 'http://localhost:8000/api/loadalbums/'+id;
        await axios.get(url).then(({data})=>{
            setAlbums(data)
            if(data && data.length >0){
              data.map(i =>{
                setOptions(old => [...old, {value: i.id, label: <div><img src={`./storage/albums/cover/${i.cover}`} style={{width: 50, left: 5,height: 50, borderRadius: 50}}/>{i.nombre} </div>}])
              })
            }
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
            <div>
              
            </div>
            <div style={{fontSize: 30, color: 'white', paddingLeft: 20}}>
                {(songs.length>0 && songs)? <div><Recomendar/>
                <>
                <Form.Group className="mb-3" style={{backgroundColor: 'rgba(0,0,0,0.8)', width: 430,padding: 10,textAlign: 'center',fontFamily: 'Bahnschrift',fontSize: 23, color: 'white', border: '2px solid white'}} controlId="formBasicPassword">
                  <Select options={options} placeholder="Search by album" styles={customStyles} defaultValue={selectedAlbum}  onChange={(value)=> setSelectedAlbum(value)} />
                </Form.Group>
                <Table style={{fontSize: 13, width: '70vw',backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 20, color:'white', borderTop:'1px solid white',paddingLeft: 15, paddingRight: 15}}>
                    <Tbody style={{fontSize: '14'}}>
                    {
                        songs
                        .filter(i => i.idalbum.toString().match(new RegExp(selectedAlbum.value, "i")))
                        .map((i,dsd)=>{
                        return(
                        <Tr key={dsd}>
                            <Td><button className="glow-on-hover2" onClick={()=> {(onPlay==dsd)? setOnPlay(): setOnPlay(dsd), updateCore(songs), (isPlay)? updatePlay(false):updatePlay(true),updateIndex(dsd)} }><FontAwesomeIcon icon ={(dsd==onPlay && isPlay)? faPause:faPlay }/></button></Td>
                            <Td>{i.name}</Td>
                            <Td>{i.artist}</Td>
                            <Td>{i.albumname}</Td>
                            <Td>{i.artistname}</Td>
                            <Td>{(onPlay==dsd && isPlay ) ?<Lottie className = "bars" options={barsOptions} height={30} width={30}/>: <div style={{width: 50, height: 50}}></div> }</Td>
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