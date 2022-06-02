
import react, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faPauseCircle, faBackward, faForward } from '@fortawesome/free-solid-svg-icons';
export default function Player({idx, core, updatePlay, isPlay}){
    const player = new Audio();
    useEffect(()=>{
        control()
    },[])
    const control = ()=>{
        if(core.length>0){
            player.src = `./storage/songs/audio/${core[idx].source}`;
            console.log("Vale!")
            if(isPlay)
                player.play();
            else
                player.pause();
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
                <div>
                    <div>
                        <div>
                            <button><FontAwesomeIcon icon={faBackward} /></button>
                        </div>
                        <div>
                            <button onClick={()=> {(isPlay)? updatePlay(false):updatePlay(true), control()}}><FontAwesomeIcon icon={(isPlay)? faPauseCircle: faPlayCircle} /></button>
                        </div>
                        <div>
                            <button><FontAwesomeIcon icon={faForward} /></button>
                        </div>
                    </div>  
                    <div>
                        
                    </div>  
                </div>
                </div>
                : console.log('porno')
                }

            </div>
        </div>
    );
}