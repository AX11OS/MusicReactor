import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import {useNavigate, useParams} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash, faPlay, faPause, faCancel } from '@fortawesome/free-solid-svg-icons';
function Text() {
    const styles = useSpring({
        from: { opacity: "0" },
        to: { opacity: "1" },
        config: { duration: "1000" }
      })
    return <div>
            <animated.div style={styles}>
                Songs Results
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
                Artists result
            </animated.div>
        </div>
  }

export default function ClientSearch({updateCore, updateIndex, updatePlay, isPlay}){
    const navigate = useNavigate();
    const [resultsSongs, setResultSongs] = useState([]);
    const [resultArtists, setResultArtists] = useState([]);
    const [searched, setSearched] = useState('')
    const { search } = useParams()
    const [onPlay, setOnPlay] = useState();
    const loadSongs = async () => {
      console.log("arre")
      var url = 'http://localhost:8000/api/searchsongs/'+search;
      await axios.get(url).then(({data})=>{
        setResultSongs(data)
      })
    }
    const loadArtists = async () => {
      var url = 'http://localhost:8000/api/searchartists/'+search;
      await axios.get(url).then(({data})=>{
        setResultArtists(data)
        
      })
    }
    useEffect(()=>{
      loadSongs(),
      loadArtists()
    }, [])

    const CardCan=(props)=>{
      console.log("Props : " + props.name);
      return(
        <div style={{textAlign: 'center', color: 'white', alignContent: 'center', maxWidth:'100px', backgroundColor:'black'}}>
          <img style ={{maxWidth: '400px', width: '100%', height: 'auto'}} src ={`./storage/albums/cover/${props.cover}`}/>
          <p>{props.name}</p>
          <div style = {{top: -10}}>
          <button className="glow-on-hover2" onClick={()=> {(onPlay==props.ind)? setOnPlay(): setOnPlay(props.ind), updateCore(resultsSongs), (isPlay)? updatePlay(false):updatePlay(true),updateIndex(props.ind)} }><FontAwesomeIcon icon ={(props.ind==onPlay && isPlay)? faPause:faPlay }/></button>
          </div>
        </div>
      );
    }

    
    const CardArt=(props)=>{
      console.log("Props : " + props.name);
      return(
        <div onClick ={()=> navigate(`/Client/Artist/${props.idartista}`)}  style={{textAlign: 'center', color: 'white', alignContent: 'center', maxWidth:'100px', backgroundColor:'black'}}>
          <img style ={{maxWidth: '400px', width: '100%', height: 'auto', borderRadius:100}} src ={`./storage/artistas/logo/${props.logo}`}/>
          <p>{props.name}</p>
          <div style = {{top: -10}}>
          </div>
        </div>
      );
    }

    return(
        <div>
            <div style={{fontSize: 30, color: 'white', paddingLeft: 20}}>
                {(resultArtists.length>0 && resultArtists)? <div><Recomendar/>
                  <div style={{borderBottom: '1px solid white', display:'flex', flexDirection:'row',fontSize: 15}}>
                    {resultArtists.map((res, ind)=>{
                      return <CardArt key={ind} name = {res.nombre} logo={res.logo} idartista ={res.id}></CardArt>       
                    })}
                  </div>
                </div>: <></> }
                {(resultsSongs.length>0 && resultArtists)? <div><Text/>
                  <div style={{borderBottom: '1px solid white', fontSize: 30}}>
                    {resultsSongs.map((res, ind)=>{
                      return <CardCan key={ind} name = {res.name} cover={res.cover} ind={ind}></CardCan>       
                    })}
                  </div>
                </div>: <Recomendar/> }
            </div>
        </div>
    );
}