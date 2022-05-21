import React from 'react';
import ReactDOM from 'react-dom';

function Example() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card" class="text-white bg-dark">
                        <div className="card-header">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia totam iure voluptate dolorum accusamus sed cum inventore cupiditate dignissimos eos explicabo odit sit facilis veniam, quaerat blanditiis obcaecati id cumque?</div>

                        <div className="card-body">I'm an example component!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
