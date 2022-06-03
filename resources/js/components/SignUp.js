import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Form, Container, Row, Button, Navbar, Card, Nav, Table, InputGroup, Alert } from 'react-bootstrap';
import NavBar from './Navbar';
import { Link, useNavigate } from "react-router-dom";
import Axios from 'axios';
import logo from '/images/image2vector.svg';
import * as ReactNavbar from "react-responsive-animate-navbar";

const SignUp = () => {

    let navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleInputChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.name == "" || data.email == "" || data.password == "") {
            swal({
                title: "Warning",
                text: "The fields are empty, please verify and enter your credentials.",
                icon: 'warning',
            });
            return;
        }
        let formD = new FormData()
        formD.append('name', data.name)
        formD.append('email', data.email)
        formD.append('password', data.password)
        formD.append('access', 'no')
        await Axios({
            method: 'post',
            url: 'api/register',
            data: formD,
            config: { headers: { 'Content-Type': 'xhr' } }
        })
            .then(response => {

                if (response.status == 200) {
                    swal({
                        title: "Register",
                        text: "¡Welcome!",
                        icon: 'success',
                    });
                    console.log(response.data.id);
                    console.log(response.data.token);
                    localStorage.setItem('_id',response.data.id)
          navigate('/Client/');
                }
            })
            .catch(error => {
                swal({
                    title: "Error",
                    text: "The credentials are incorrect. This user has already been registered. Password too short, must be at least 8 characters, The name requiret min 4 characters.",
                    icon: 'error',
                });
            })
    }
    return (
        <>
            <div>
            <NavBar></NavBar>
                <div className="abs-center">
                    <section className=" text-center text-lg-start bgimage-1">
                        <div className="container-fluid">
                            <div className='row'>
                                <div className='col-xs-12 col-md-8 col-lg-6 rgbaDark mt-5'>
                                    <div className='col-center'>
                                        <Form>
                                            <h3>
                                                <Form.Label className='text-white mx-5 mt-5'>SignUp.</Form.Label>
                                            </h3>
                                            <Form.Group className="mb-3" >
                                                <Form.Label className='text-white'>Name</Form.Label>
                                                <Form.Control className="mx-5" type="text" placeholder="Enter name" name="name" onChange={handleInputChange} />
                                                <Form.Text className="text-muted">
                                                </Form.Text>
                                            </Form.Group>
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
                                            <div className='col'>
                                                <div className='col- align-content-center col-center'>
                                                    <Button className="btn btn-primary  mx-5 center-block col-xs-12 col-sm-4 col-sm-push-3 px-5 mb-4" variant="primary" type="submit" onClick={handleSubmit} >Submit
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

export default SignUp;