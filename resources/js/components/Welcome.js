import React from 'react';
import ReactDOM from 'react-dom';

function Welcome() {
    return (
        <div>Hola soy welcome</div>
    );
}

export default Welcome;

if (document.getElementById('welcome')) {
    ReactDOM.render(<Welcome />, document.getElementById('welcome'));
}

