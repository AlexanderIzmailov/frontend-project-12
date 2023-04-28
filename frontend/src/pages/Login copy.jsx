import { useFormik } from 'formik';
import * as Yup from 'yup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

import routes from '../routes.js';

import { useTranslation } from 'react-i18next';

import io from 'socket.io-client';
// import * as io from 'socket.io-client'

import { FocusError } from 'focus-formik-error';

const test = () => {
  //  routes.authorise('admin', 'admin')
  //   .then((response) => response.data.token)
  //   .then((token) => routes.getData(token))
  //   .then((response) => console.log(response.data))
  //   .catch((err) => console.log('ERR: ', err.response.data))
  // const { token } = useAuth();
  // console.log('TOKENNL ', token)
  // document.querySelector('html').classList.add('h-100')
  // document.body.classList.add('h-100')
  // document.querySelector('#root').classList.add('h-100')

  // const socket = io();
  // socket.on('connection', (newSocket) => {
  //   console.log('User connnnnected');
  //   newSocket.on('disconnect', () => {
  //     console.log('User disconnnnected')
  //   })
  // })
  // socket.emit('newMessage', 'Test message 1')
  // socket.emit('newMessage', { body: "message text", channelId: 1, username: 'admin' });
  // socket.on('newMessage', (msg) => {
  //   console.log('New message: ', msg)
  // })

}

export const Login = () => {
  const { t } = useTranslation();

  const [authError, setAuthError] = useState(null);

  const navigate = useNavigate();

  const {
    setAuthUser,
    setIsLoggedIn,
    setToken,
  } = useAuth();

  const LogInToServer = (values) => {
    const { userName, password } = values;
    // axios.post('/api/v1/login', { username: userName, password: password })
    routes.authorise(userName, password)
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
        const { error } = err.response.data
        const errorTextKey = error === 'Unauthorized' ? 'loginForm.errors.invalidAuth' : error;
        setAuthError(t(errorTextKey));
      })
  }

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .required(t('loginForm.errors.requiredField')),
      password: Yup.string()
        .required(t('loginForm.errors.requiredField')),
    }),
    onSubmit: (values) => {
      LogInToServer(values);
    }
  });

  return (
    <div className="container center-block">

      <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0 mx-auto">
        <FocusError formik={formik} />
        <h1 className="text-center mb-4">{t('loginForm.title')}</h1>

        <Form.Group className="mb-3">
          <FloatingLabel
            controlId="userName"
            label={t('loginForm.userName')}
            className="mb-3"
          >
            <Form.Control
              name="userName"
              type="text"
              onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              value={formik.values.userName}
              placeholder={t('loginForm.userName')}
              className={authError || (formik.errors.userName && formik.touched.userName) ? 'is-invalid' : ''}
              autoFocus
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
            label={t('loginForm.password')}
            className="mb-3"
          >
            <Form.Control
              name="password"
              type="password"
              onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder={t('loginForm.password')}
              className={authError || (formik.errors.password && formik.touched.password) ? 'is-invalid' : ''}
            />
            <Form.Text className="text-danger">
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </Form.Text>
            {authError && (<div className="invalid-tooltip">{authError}</div>)}
          </FloatingLabel>

        </Form.Group>
        <Button className="w-100 mb-3 btn btn-outline-primary" variant="outline-primary" type="submit">
          {t('loginForm.submit')}
        </Button>
      </Form>

      <div className="text-center">
        <span>{t('loginForm.invitationToRegister')} </span>
        <a href="/signup">{t('loginForm.registerLink')}</a>
      </div>

      <div className="text-center">
        <Button onClick={test} className="mx-auto" variant="warning">Test</Button>
      </div>
    </div>
  )
}
