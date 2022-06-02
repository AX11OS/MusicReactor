import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Form, Container, Row, Button, Navbar, Col, Nav, Image, ButtonGroup, Alert } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import Axios from 'axios';
import swal from 'sweetalert';
import './css/app.css'

const Login = () => {

  let navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.email == "" || data.password == "") {
      swal({
        title: "Login",
        text: "The fields are empty, please enter your user credentials.",
        icon: 'warning',
      });
      return;
    }
    let toSend = new FormData()
    toSend.append('email', data.email)
    toSend.append('password', data.password)

    await Axios({
      method: 'post',
      url: 'api/login',
      data: toSend,
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
    })
      .then(response => {
        if (response.status == 200) {
          swal({
            title: "Succes",
            text: "You are already logged in!!",
            icon: 'success',
          });
          navigate('/evmo/public/SeeAdmin', { state: { token: response.data.token, email: data.email } });
          console.log(response.data.token);
        }
      })
      .catch(error => {
        swal({
          title: "Login",
          text: "The credentials are incorrect, please check them.",
          icon: 'error',
        });
      })
  }
  return (
    <>
      <div>
        {/* Colocar Navbar Aqui */}
        <div className="abs-center">
          <section className=" text-center text-lg-start bgimage-1">
            <div className="container-fluid">
              <div className='row'>
                <div className='col-xs-12 col-md-8 col-lg-6 rgbaDark'>
                  <div className='col-center'>
                    <Form>
                      <h3>
                        <Form.Label className='text-white mx-5 mt-5'>Login.</Form.Label>
                      </h3>
                      <Form.Group className="mb-3" >
                        <Form.Label className='text-white'>Email address</Form.Label>
                        <Form.Control className="mx-5" type="email" placeholder="Enter Email" name="email" onChange={handleInputChange} />
                        <Form.Text className="text-muted">
                        </Form.Text>
                      </Form.Group>
                      <Form.Group className="mb-3" >
                        <Form.Label className='text-white'>Password</Form.Label>
                        <Form.Control className="mx-5" type="password" placeholder="Enter password" name="password" onChange={handleInputChange} />
                        <Form.Text className="text-muted">
                        </Form.Text>
                      </Form.Group>
                      <div className='row-cols-auto'>
                        <div className='col- align-content-center col-center'>
                          <Button className="mx-5 btn center-block col-xs-12 col-sm-4 col-sm-push-3 btn-primary px-5 btn-block mb-4" variant="gradient" type="submit" onClick={handleSubmit} >Submit
                          </Button>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
export default Login;