
import react, {useState, useEffect, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faPauseCircle, faBackward, faForward, faHeart, faHeartCircleCheck } from '@fortawesome/free-solid-svg-icons';
import './css/botonesplayer.css';
import AudioSpectrum from 'react-audio-spectrum2';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

export default function Player({idx, core, updatePlay, isPlay, updateIndex}){
    const player = useRef(new Audio());
    const [oldidx,setOldidx] = useState()
    const MySwal = withReactContent(Swal)
    useEffect(()=>{
        control()
    },[isPlay,idx])

    let [currLength, setCurrLength] = useState(0)
    let [length, setLength] = useState(0)
    const progressBar = document.querySelector('.progressBar')
    
    function updateProgress(e){
      let offset = e.target.getBoundingClientRect().left
      let newOffSet = e.clientX
      let newWidth = newOffSet - offset
      progressBar.style.width = newWidth+"px"
      let secPerPx = length / 280
      player.current.currentTime = secPerPx * newWidth
    }
    
    setInterval(() => {
      setLength(Math.ceil(player.current.duration))
      setCurrLength(Math.ceil(player.current.currentTime))
      let secPerPx = Math.ceil(player.current.duration) / 280
      let newWidth = player.current.currentTime / secPerPx
      document.querySelector('.progressBar').style.width = newWidth+"px"
      if(player.current.currentTime === player.current.duration){
        updateIndex(idx+1)
      }
    }, 1000);
    
    function Formato(s){
      return Number.isNaN(s) ? '0:00' : (s-(s%=60))/60+(9<s?':':':0')+s
    }

    const move =(types)=>{
        if(types=="back"){
            console.log("atras")
            if(idx==0){
                updateIndex(core.length)
            }else{
                updateIndex(idx-1);
            }
        }else{
            console.log("adelante")
            if(idx==core.length){
                updateIndex(0)
                updatePlay(false)
            }else{
                updateIndex(idx+1);

            }

        }
        updatePlay(false)
        player.current.src = `./storage/songs/audio/${core[idx].source}`
        player.current.pause()
        player.current.load()
        player.current.play()
    }

    const add = async(idxx)=>{
        var url = 'http://localhost:8000/api/addfavorite/';
        await axios.get(url+idxx).then(({data})=>{
            MySwal.fire({
                title: 'Added to favorites',
                width: 600,
                padding: '3em',
                color: '#FFF',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
                background: '#000000',
                backdrop: `
                  rgba(0,125,0,0.3)
                  left top
                  no-repeat
                `
              })
        })
    }

    const control = ()=>{
        if(core.length>0){
            if(isPlay === true){
                if(idx!=oldidx){
                    setOldidx(idx);
                    player.current.src = `./storage/songs/audio/${core[idx].source}`
                    player.current.pause()
                    player.current.load()
                    player.current.play()
                }else{
                    player.current.play()
                }            
                console.log("Play!")
            }else{
                player.current.pause();
                console.log("Pausa!")
            }


        }

    }
    return(
        <div style={{backgroundColor: 'black', width: '100wv', heigth: 190}}>
            <div >
                {(core &&core.length> 0) ?
                
                <div style={{display: 'flex', flexDirection: 'row'}}>               
                <div>
                    <img style={{width: 150, padding: 20,height:150}} src={`./storage/albums/cover/${core[idx].cover}`}/>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{paddingLeft: 15, paddingTop: 20,fontSize: 40, color: 'white'}}>
                        {core[idx].name}
                    </div>
                    <div style={{paddingLeft: 15, paddingTop: 5,fontSize: 15, color: 'white'}}>
                        {core[idx].artist}
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignContent:'center', alignItems: 'center'}}>
                    <div style={{display: 'flex', flexDirection: 'row', marginTop: 40, alignContent:'center', position: 'absolute', left: 650,alignItems: 'center'}}>
                        <div>
                            <button className='botonesplayer' style={{width:40, height:40, marginLeft: -20,marginRight: 20,marginTop: 10}} onClick={()=>move("back")}><FontAwesomeIcon icon={faBackward} /></button>
                        </div>
                        {'    '}
                        <div>
                            <button className='botonesplayer' style={{width:60, height:60}} onClick={()=> {(isPlay)? updatePlay(false):updatePlay(true), control()}}><FontAwesomeIcon style={{width: 40, height: 40}} icon={(isPlay)? faPauseCircle: faPlayCircle} /></button>
                        </div>
                        {'    '}
                        <div>
                            <button className='botonesplayer' style={{width:40, height:40,marginLeft: 20, marginTop: 10}} onClick={()=>move("vaca")} ><FontAwesomeIcon icon={faForward} /></button>
                        </div>
                        <div>
                            <button className='botonesplayer' style={{width:40, height:40,marginLeft: 20, marginTop: 10}} onClick={()=>add(core[idx].idplay)} ><FontAwesomeIcon icon={(core[idx].favorite==1)?faHeartCircleCheck:faHeart} /></button>
                        </div>

                    </div>  
                    <div>
                        <div className="progress" style={{position: 'absolute', bottom: 10, left: 580, width:'280px'}}>
                            <div style={{color: 'white', fontSize: 12}}>
                                <p>{Formato(currLength)}</p>
                            </div>
                            <div 
                            className="progressCenter" 
                            onClick={(e) => updateProgress(e)}>
                                <div className="progressBar">
                                </div>
                            </div>
                            <div className="songLength" style={{color: 'white'}}>
                                <p>{Formato(length)}</p>
                            </div>

                        </div>
                        <div style={{position: 'absolute', right: 10}}>
                        <AudioSpectrum
                            id="audio-canvas"
                            height={150}
                            width={250}
                            audioEle={player.current}
                            />
                        </div>
                    </div>  
                </div>
                </div>
                : console.log('porno')
                }

            </div>
        </div>
    );
}