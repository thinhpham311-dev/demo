import React, { useState } from 'react';
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap"
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
 import * as Yup from "yup"

const Login = (props) => {
     const navigate = useNavigate();
    let data = [{
           uid: 1,
            username: "sidekickad",
            role: "admin",
            password: "SideKick@d2022",
            email: "admin@sidekick.com",
    }]
 
    const validation = useFormik({
        
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
        email: "",
        password: "",
        },
        validationSchema: Yup.object({
        email: Yup.string().required("Please Enter Your Email"),
        password: Yup.string().required("Please Enter Your Password"),
        }),
         onSubmit: (value, e) => {
              handleLogin(value, e)
        },
    })
    
    const handleLogin = (value, e) => {
        if (value.email !== '' && value.password !== '') {
           const uservalid = data.filter(user => user.email === value.email && user.password === value.password)
            return new Promise((resolve, reject) => {
                if (uservalid.length === 1) {
                    resolve([200, uservalid[0]])
                    navigate('/')
                } else {
                    props.setNotified({
                        completed: true,
                        content: 'Đăng nhập thất bại',
                        style: {'position': 'fixed', 'top': 0, 'left': '50%'}
                    })
                }
            })
        } 
       e.preventDefault();
    }
    

    return (
        <React.Fragment >
            <div className='container' >
                <div className='row align-items-center' style={{height: 'calc(100vh - 40px)'}}>
                    <div className='col-4'></div>
                    <div className='col-4'>
                    <div className="card border-primary">
                
                    <div className="card-body">
                        <h4 className="card-title text-center">Login</h4>

                                <Form onSubmit={e => {
                                            e.preventDefault()
                                            validation.handleSubmit()
                                            return false
                                }}>
                                   
                                <div className='form-group mb-3'>
                                    <label className='form-label' htmlFor="email">Email</label>
                                            
                                        <Input type="email"
                                            id="email"
                                           value={validation.values.email || ""}
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            className="form-control"
                                            placeholder='Vui lòng nhập email'
                                            invalid={
                                                validation.touched.email && validation.errors.email
                                                    ? true
                                                    : false}
                                        />
                                        {validation.touched.email && validation.errors.email ? (
                                        <FormFeedback type="invalid">
                                            {validation.errors.email}
                                        </FormFeedback>
                                        ) : null}
                                </div>
                                <div className='form-group mb-3'>
                                    <label className='form-label' htmlFor="password">Password</label>
                                        <Input type="password" id="password"
                                            value={validation.values.password || ""}
                                             onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                                            className="form-control"
                                            placeholder="Vui lòng nhập password"
                                         invalid={
                                                validation.touched.password && validation.errors.password
                                                    ? true
                                                    : false}
                                        />
                                        {validation.touched.password && validation.errors.password ? (
                                        <FormFeedback type="invalid">
                                            {validation.errors.password}
                                        </FormFeedback>
                                        ) : null}
                                    </div>
                                    <div className="form-check">
                                        <input
                                        type="checkbox"
                                        className="form-check-input"
                                            id="customControlInline"
                                          
                                        />
                                        <label
                                        className="form-check-label"
                                        htmlFor="customControlInline"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                <button type='submit' className='btn btn-primary mx-auto my-3 d-block'>Đăng nhập</button>
                            </Form>
                        </div>
                        </div>
                        
                    </div>
                    <div className='col-4'></div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Login;
