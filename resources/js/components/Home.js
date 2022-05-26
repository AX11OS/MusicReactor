import React from 'react';
import ReactDOM from 'react-dom';
import './css/app.css'

function Home() {
    return (
        <div>
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

