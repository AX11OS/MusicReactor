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

const tracks = [
        {
          name: "Mekanın Sahibi",
          artist: "Norm Ender",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/1.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/1.mp3",
          url: "https://www.youtube.com/watch?v=z3wAjJXbYzA",
          favorited: false
        },
        {
          name: "Everybody Knows",
          artist: "Leonard Cohen",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/2.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/2.mp3",
          url: "https://www.youtube.com/watch?v=Lin-a2lTelg",
          favorited: true
        },
        {
          name: "Extreme Ways",
          artist: "Moby",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/3.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/3.mp3",
          url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
          favorited: false
        },
        {
          name: "Butterflies",
          artist: "Sia",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/4.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/4.mp3",
          url: "https://www.youtube.com/watch?v=kYgGwWYOd9Y",
          favorited: false
        },
        {
          name: "The Final Victory",
          artist: "Haggard",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/5.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/5.mp3",
          url: "https://www.youtube.com/watch?v=0WlpALnQdN8",
          favorited: true
        },
        {
          name: "Genius ft. Sia, Diplo, Labrinth",
          artist: "LSD",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/6.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/6.mp3",
          url: "https://www.youtube.com/watch?v=HhoATZ1Imtw",
          favorited: false
        },
        {
          name: "The Comeback Kid",
          artist: "Lindi Ortega",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/7.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/7.mp3",
          url: "https://www.youtube.com/watch?v=me6aoX0wCV8",
          favorited: true
        },
        {
          name: "Overdose",
          artist: "Grandson",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/8.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/8.mp3",
          url: "https://www.youtube.com/watch?v=00-Rl3Jlx-o",
          favorited: false
        },
        {
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

  function openURL(){
    window.open(tracks[props.idx].url, "_blank")
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
      <button className="opt" onClick={openURL}>
        <BoxArrowUpRight/>
      </button>
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

function Avatar(props){ 
  return(
    <div style={{display: 'flex'}}>
      <img src={tracks[props.idx].cover} className="avatar"/>
        <div style={{flexDirection: 'column'}}>
        <h4 className="name">{tracks[props.idx].artist}</h4>
        <h1 className="title">{tracks[props.idx].name}</h1>
      </div>
    </div>
  );
}


export default function Reproductor() {
  let [idx, setIdx] = useState(0);
  let [playState, setPlayState] = useState(false);
  let oldIdx = useRef(idx)
  useEffect(() => {
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
          <Avatar idx={idx}/>
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
