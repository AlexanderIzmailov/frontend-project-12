import { useFormik, Formik } from 'formik';
import * as Yup from 'yup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { ConnectedFocusError } from 'focus-formik-error'

import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

import routes from '../routes.js';

import io from 'socket.io-client';

export const Signup = () => {
    // const formik = useFormik({
    //     initialValues: {
    //         userName: '',
    //         password: '',
    //         passwordConfirmation: '',
    //     },
    //     validationSchema: Yup.object({
    //         userName: Yup.string()
    //             .required('Required')
    //             .min(3, 'Too short')
    //             .max(20, 'Too long'),
    //         password: Yup.string()
    //             .required('Required')
    //             .min(6, 'Too short'),
    //         passwordConfirmation: Yup.string()
    //             .required('Required')
    //             .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    //     }),
    //     onSubmit: (values) => {
    //         // LogInToServer(values);
    //     }
    // });

    // useEffect(() => {
    //     console.log('ERRORS: ', Object.keys(formik.errors))
    //     if (Object.keys(formik.errors).length > 0) {
    //       document.getElementsByName(Object.keys(formik.errors)[0])[0].focus();
    //     }
    //   }, [formik.errors]);

    return (
        <div className="container center-block">
            {/* <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0 mx-auto">
                <h1 className="text-center mb-4">Регистрация</h1>

                <Form.Group className="mb-3" controlId="userName">
                    <FloatingLabel
                        controlId="userName"
                        label="Your user name"
                        className="mb-3"
                    >
                        <Form.Control
                            name="userName"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.userName}
                            placeholder="Your user name"
                        // className={authError ? 'is-invalid' : ''}
                        />
                        <Form.Text className="text-danger">
                            {formik.touched.userName && formik.errors.userName ? (
                                <div>{formik.errors.userName}</div>
                            ) : null}
                        </Form.Text>
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="password"
                        label="Password"
                        className="mb-3"
                    >
                        <Form.Control
                            name="password"
                            type="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            placeholder="Your user name"
                        // className={authError ? 'is-invalid' : ''}
                        />
                        <Form.Text className="text-danger">
                            {formik.touched.password && formik.errors.password ? (
                                <div>{formik.errors.password}</div>
                            ) : null}
                        </Form.Text>
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="passwordConfirmation"
                        label="Password"
                        className="mb-3"
                    >
                        <Form.Control
                            name="passwordConfirmation"
                            type="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.passwordConfirmation}
                            placeholder="Your user name"
                        // className={authError ? 'is-invalid' : ''}
                        />
                        <Form.Text className="text-danger">
                            {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? (
                                <div>{formik.errors.passwordConfirmation}</div>
                            ) : null}
                        </Form.Text>
                    </FloatingLabel>

                    <Button className="w-100 mb-3 btn btn-outline-primary" variant="outline-primary" type="submit">
                        Submit
                    </Button>
                </Form.Group>
            </Form> */}

            <Formik
                initialValues={{
                    userName: '',
                    password: '',
                    passwordConfirmation: '',
                }}
                validationSchema={
                    Yup.object({
                        userName: Yup.string()
                            .required('Required')
                            .min(3, 'Too short')
                            .max(20, 'Too long'),
                        password: Yup.string()
                            .required('Required')
                            .min(6, 'Too short'),
                        passwordConfirmation: Yup.string()
                            .required('Required')
                            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
                    })
                }
                onSubmit={
                    (values) => console.log(values)
                }
            >
                {(props) => (
                    <Form onSubmit={props.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0 mx-auto">
                        <ConnectedFocusError />
                        <h1 className="text-center mb-4">Регистрация</h1>

                        <Form.Group className="mb-3" controlId="userName">
                            <FloatingLabel
                                // controlId="userName"
                                label="Username"
                                className="mb-3"
                            >
                                <Form.Control
                                    name="userName"
                                    type="text"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.userName}
                                    placeholder="Username"
                                // className={authError ? 'is-invalid' : ''}
                                />
                                <Form.Text className="text-danger">
                                    {props.touched.userName && props.errors.userName ? (
                                        <div>{props.errors.userName}</div>
                                    ) : null}
                                </Form.Text>
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <FloatingLabel
                                // controlId="passwordConfirmation"
                                label="Password"
                                className="mb-3"
                            >
                                <Form.Control
                                    name="password"
                                    type="password"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.password}
                                    placeholder="Password"
                                // className={authError ? 'is-invalid' : ''}
                                />
                                <Form.Text className="text-danger">
                                    {props.touched.password && props.errors.password ? (
                                        <div>{props.errors.password}</div>
                                    ) : null}
                                </Form.Text>
                                {/* {authError && (<div className="invalid-tooltip">{authError}</div>)} */}
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="passwordConfirmation">
                            <FloatingLabel
                                // controlId="passwordConfirmation"
                                label="Password confirmation"
                                className="mb-3"
                            >
                                <Form.Control
                                    name="passwordConfirmation"
                                    type="password"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.passwordConfirmation}
                                    placeholder="Confirm password"
                                // className={authError ? 'is-invalid' : ''}
                                />
                                <Form.Text className="text-danger">
                                    {props.touched.passwordConfirmation && props.errors.passwordConfirmation ? (
                                        <div>{props.errors.passwordConfirmation}</div>
                                    ) : null}
                                </Form.Text>
                                {/* {authError && (<div className="invalid-tooltip">{authError}</div>)} */}
                            </FloatingLabel>
                        </Form.Group>

                        <Button className="w-100 mb-3 btn btn-outline-primary" variant="outline-primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}