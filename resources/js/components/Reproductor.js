import React,{useState, useEffect, createContext, useRef, useContext} from 'react';
import ReactDOM from 'react-dom';
import {Transition} from 'react-transition-group';
import { 
  ThreeDots, 
  ChevronLeft, 
  PauseFill, 
  PlayFill,
  SkipBackwardFill,
  SkipForwardFill,
  Shuffle,
  ArrowRepeat,
  Heart,
  BoxArrowUpRight,
  HeartFill
} from "react-bootstrap-icons";
import './css/reproductor.css';

const tracks = [{
          name: "Rag'n'Bone Man",
          artist: "Human",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/9.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/9.mp3",
          url: "https://www.youtube.com/watch?v=L3wKzyIN1yk",
          favorited: false
        }]

const player = new Audio(tracks[0].source)
player.setAttribute('preload', 'metadata')

const userOptions = createContext({
  shuffle: false,
  repeat: false,
})

function Options (props){
  let options = useContext(userOptions)
  let [shuffl, setShuffle] = useState(options.shuffle)
  let [repet, setRepeat] = useState(options.repeat)
  let [fav, setFav] = useState(tracks[props.idx].favorited)
  
  useEffect(() => setFav(tracks[props.idx].favorited))
  
  function shuffle(){
    options.shuffle = !options.shuffle
    options.repeat = false
    setShuffle(!shuffl)
    setRepeat(false)
  }
  
  function repeat(){
    options.repeat = !options.repeat
    options.shuffle = false
    setShuffle(false)
    setRepeat(!repet)
  }
  
  function favorite(){
    tracks[props.idx].favorited = !tracks[props.idx].favorited
    setFav(tracks[props.idx].favorited)
  }

  return(
    <div className="options">
      {
        shuffl &&
        <button onClick={shuffle} className="opt" style={{color: '#147CC0'}}>
          <Shuffle/>
        </button>
        ||
        <button onClick={shuffle} className="opt" >
          <Shuffle/>
        </button>
      }
      {
        fav &&
      <button onClick={favorite}  className="opt" style={{color: '#147CC0'}}>
        <HeartFill/>
      </button>
          ||
        <button onClick={favorite}  className="opt" >
        <Heart/>
      </button>
            
        }
      {
        repet &&
      <button onClick={repeat} className="opt" style={{color: '#147CC0'}}>
        <ArrowRepeat/>
      </button>
          ||
            <button onClick={repeat} className="opt">
        <ArrowRepeat/>
      </button>
        }
    </div>
  );
}

function Control(props){
  
  return(
    <div className="controls">
      <button 
        className="controlButton"
        onClick={
          x => props.setIdx(props.idx-1 < 0 ? 8 : props.idx-1)
        }>
        <SkipBackwardFill />
      </button>
      {
        props.playState === true ? 
          <button 
            className="centerButton"
            onClick={x => props.setPlayState(false)}>
            <PauseFill />
          </button> : 
          <button
            className="centerButton"
            onClick={x => props.setPlayState(true)}>
            <PlayFill />
          </button>
      }
      <button
        className="controlButton"
        onClick={x => props.setIdx((props.idx+1)%9)}>
        <SkipForwardFill />
      </button>
    </div>
  );
}

function Progress(props){
  let [currLength, setCurrLength] = useState(0)
  let [length, setLength] = useState(0)
  let options = useContext(userOptions)
  const progressBar = document.querySelector('.progressBar')
  
  function updateProgress(e){
    let offset = e.target.getBoundingClientRect().left
    let newOffSet = e.clientX
    let newWidth = newOffSet - offset
    progressBar.style.width = newWidth+"px"
    let secPerPx = length / 280
    player.currentTime = secPerPx * newWidth
  }
  
  setInterval(() => {
    setLength(Math.ceil(player.duration))
    setCurrLength(Math.ceil(player.currentTime))
    let secPerPx = Math.ceil(player.duration) / 280
    let newWidth = player.currentTime / secPerPx
    document.querySelector('.progressBar').style.width = newWidth+"px"
    if(player.currentTime === player.duration){
      if(options.shuffle === true){
        props.setIdx((parseInt(Math.random()*1000))%9)
      }
      else if(options.repeat === true){
        player.play()
      }
      else{
        props.setIdx((props.idx+1)%9)
      }
    }
  }, 1000);
  
  function Formato(s){
    return Number.isNaN(s) ? '0:00' : (s-(s%=60))/60+(9<s?':':':0')+s
  }
  
  return(
    <div className="progress">
      <div className="currentTime">
        <p>{Formato(currLength)}</p>
      </div>
      <div 
      className="progressCenter" 
      onClick={(e) => updateProgress(e)}>
        <div className="progressBar">
        </div>
      </div>
      <div className="songLength">
        <p>{Formato(length)}</p>
      </div>
    </div>
  );
}

export default function Reproductor(newCore) {
  const [tracks, setTracks] = useState([]);

  let [idx, setIdx] = useState(0);
  let [playState, setPlayState] = useState(false);
  let oldIdx = useRef(idx)
  if(newCore.core && newCore.core> 0){
    const player = new Audio(newCore.core[newCore.index].source)
  }

  useEffect(() => {
    setTracks(newCore.core)
    if(playState === true)
      player.play()
    else
      player.pause()
    if(idx !== oldIdx.current){
      player.pause()
      player.src = tracks[idx].source
      player.load()
      player.play()
      setPlayState(true)
      oldIdx.current = idx
    } 
  })

  return (
    <div>
        <div className='container' style={{display: 'flex'}}>

          <div style={{display: 'flex'}}>
            <img src={tracks[idx].cover} className="avatar"/>
            <div style={{flexDirection: 'column'}}>
            <h4 className="name">{tracks[idx].artist}</h4>
            <h1 className="title">{tracks[idx].name}</h1>
          </div>

        </div>
          <div style={{flexDirection: 'column', alignContent:'center'}}>
            <Control 
              setIdx={setIdx} 
              idx={idx}  
              playState={playState} 
              setPlayState={setPlayState}/>
              <Progress 
                setIdx={setIdx} 
                idx={idx} 
              />
          </div>
          <Options 
              setIdx={setIdx} 
              idx={idx}
              />
      </div>
    </div>
  );
}
