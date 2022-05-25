import React from 'react';
import ReactDOM from 'react-dom';
import './css/app.css'
import Navbar from './Navbar';

function Home() {


    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>
            <video autoPlay loop muted id='video'>
                <source src = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' type ='video/mp4'></source>
            </video>
        </div>
    );
}

export default Home;

if (document.getElementById('home')) {
    ReactDOM.render(<Home />, document.getElementById('home'));
}

