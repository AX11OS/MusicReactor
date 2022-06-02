import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Form, Container, Row, Button, Navbar, Card, Nav, Table, InputGroup, Alert } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import Axios from 'axios';

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
                title: "Register Admin",
                text: "The fields are empty, please verify and enter your credentials.",
                icon: 'warning',
            });
            return;
        }
        let formD = new FormData()
        formD.append('name', data.name)
        formD.append('email', data.email)
        formD.append('password', data.password)

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
                    /* navigate('/evmo/public/SeeAdmin', { state: { token: response.data.token, email: data.email } }); */
                    console.log(response.data.token);
                }
            })
            .catch(error => {
                swal({
                    title: "Error",
                    text: "The credentials are incorrect or this user has already been registered, please verify and try again.",
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