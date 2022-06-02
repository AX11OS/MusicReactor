import React from 'react';
import ReactDOM from 'react-dom';
import './css/app.css'

function Home() {
    return (
        <section id="sect1" class="sect" >
            <video className="video"display='flex' autoPlay loop muted id='video'>
                <source src = '/videos/tomorrow.mp4' type ='video/mp4'></source>
            </video>
        </section>
    );
}

export default Home;

if (document.getElementById('home')) {
    ReactDOM.render(<Home />, document.getElementById('home'));
}

