import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import { useSpring, animated } from 'react-spring';
import { useNavigate } from 'react-router-dom';

function Text() {
    const styles = useSpring({
        from: { opacity: "0" },
        to: { opacity: "1" },
        config: { duration: "3000" }
      })
    return <div style={{alignItems: 'center', alignContent: 'center', justifyContent: 'center'}}>
            <animated.div style={styles}>
            <img style={{height: '100vh', width: '100vw', sizeMode: 'cover'}} src={'/images/image2vector.svg'}/>
        </animated.div>
        </div>
  }

function Welcome() {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
          navigate('/HomePanel');
        }, 1500)
      }, [])
    return (
        <div className="col-lg-8 col-xs-12 col-centered" style ={{backgroundColor: '#295a73'}}>
            <Text/>
        </div>

    );
}

export default Welcome;

if (document.getElementById('welcome')) {
    ReactDOM.render(<Welcome />, document.getElementById('welcome'));
}

