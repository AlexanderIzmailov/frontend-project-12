import { useFormik, Formik } from 'formik';
import * as Yup from 'yup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { FocusError } from 'focus-formik-error'

import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

import { useTranslation } from 'react-i18next';

import routes from '../routes.js';

export const Signup = () => {
    const { t } = useTranslation();
    const [signupError, setSignupError] = useState(null);
    const navigate = useNavigate();

    const {
        setAuthUser,
        setIsLoggedIn,
        setToken,
      } = useAuth();
    
    const createUser = (values) => {
        const { userName, password } = values;
        // axios.post('/api/v1/login', { username: userName, password: password })
        routes.createUser(userName, password)
          .then((response) => {
            const { token, username } = response.data;
            localStorage.setItem('user', JSON.stringify({ token, username }));
            setAuthUser(username);
            setToken(token);
            setIsLoggedIn(true);
            navigate('/')
          })
          .catch((err) => {
            console.log('Err: ', err.response.data)
            // formik.setTouched({passwordConfirmation: null})
            formik.setTouched({})
            const { error } = err.response.data
            const errorText = error === 'Conflict' ? t('signupForm.errors.userExist') : error;
            setSignupError(errorText);
          })
      }
    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',
            passwordConfirmation: '',
        },
        validationSchema: Yup.object({
            userName: Yup.string()
                .required(t('signupForm.errors.requiredField'))
                .min(3, t('signupForm.errors.userNameLength'))
                .max(20, t('signupForm.errors.userNameLength')),
            password: Yup.string()
                .required(t('signupForm.errors.requiredField'))
                .min(6, t('signupForm.errors.passwordLength')),
            passwordConfirmation: Yup.string()
                .required(t('signupForm.errors.requiredField'))
                .oneOf([Yup.ref('password'), null], t('signupForm.errors.passwordConfirm')),
        }),
        onSubmit: (values) => {
            createUser(values);
        },
        // validateOnChange: false,
        // validateOnBlur: false,
    });

    return (
        <div className="container center-block">
            <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0 mx-auto">
                <FocusError formik={formik} />
                <h1 className="text-center mb-4">{t('signupForm.title')}</h1>

                <Form.Group className="mb-3">
                    <FloatingLabel
                        controlId="userName"
                        label={t('signupForm.userName')}
                        className="mb-3"
                    >
                        <Form.Control
                            name="userName"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.userName}
                            placeholder={t('signupForm.userName')}
                            autoFocus
                            className={signupError || (formik.errors.userName && formik.touched.userName) ? 'is-invalid' : ''}
                        />
                        <Form.Text className="text-danger">
                            {formik.touched.userName && formik.errors.userName ? (
                                <div>{formik.errors.userName}</div>
                            ) : null}
                        </Form.Text>
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                    <FloatingLabel
                        controlId="password"
                        label={t('signupForm.password')}
                        className="mb-3"
                    >
                        <Form.Control
                            name="password"
                            type="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            placeholder={t('signupForm.password')}
                            className={(formik.touched.password && formik.errors.password) ? 'is-invalid' : ''}
                        />
                        <Form.Text className="text-danger">
                            {formik.touched.password && formik.errors.password ? (
                                <div>{formik.errors.password}</div>
                            ) : null}
                        </Form.Text>
                    </FloatingLabel>
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <FloatingLabel
                        controlId="passwordConfirmation"
                        label={t('signupForm.passwordConfirm')}
                        className="mb-3"
                    >
                        <Form.Control
                            name="passwordConfirmation"
                            type="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.passwordConfirmation}
                            placeholder={t('signupForm.passwordConfirm')}
                            className={(formik.touched.passwordConfirmation && formik.errors.passwordConfirmation) ? 'is-invalid' : ''}
                        />
                        <Form.Text className="text-danger">
                            {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? (
                                <div>{formik.errors.passwordConfirmation}</div>
                            ) : null}
                        </Form.Text>
                        {signupError && (<div className="invalid-tooltip">{signupError}</div>)}
                    </FloatingLabel>

                    
                </Form.Group>
                <Button className="w-100 mb-3 btn btn-outline-primary" variant="outline-primary" type="submit">
                    {t('signupForm.submit')}
                    </Button>
            </Form>
        </div>
    )
}