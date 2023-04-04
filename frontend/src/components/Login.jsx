import { useFormik } from 'formik';
import * as Yup from 'yup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { useState } from 'react';

import { useNavigate } from 'react-router-dom'; 

import { useAuth } from './AuthContext';

import routes from './routes.js';

const test = () => {
  // const request = await axios.post('/api/v1/login', { username: 'admin', password: 'admin' });
  // console.log(request.data)
  
  // axios.post('/api/v1/login', { username: 'admin', password: 'admin' })
  //   .then((response) => console.log(response.data))
  //   .catch((err) => console.log('Err: ', err.response.data))
  // return <Navigate to={Chat}/>
  console.log(routes)
  // const navigate = useNavigate();
  // navigate('/')
}

export const Login = () => {
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
        const {token, username} = response.data;
        localStorage.setItem('token', token);
        setAuthUser(username);
        setToken(token);
        setIsLoggedIn(true);
        navigate('/')
      })
      .catch((err) => {
        console.log('Err: ', err.response.data)
        const { error  } = err.response.data
        const errorText = error === 'Unauthorized' ? 'Неверные имя пользователя или пароль' : error;
        setAuthError(errorText);
      })
  }

  // useEffect(() => {
  //   setError('aaa')
  // }, [])

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .required('Required'),
      password: Yup.string()
        .required('Required'),
    }),
    onSubmit: (values) => {
      LogInToServer(values);
    }
  });

  return (
    <div className="container center-block">
      <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0 mx-auto">
        <h1 className="text-center mb-4">Login</h1>
        
        <Form.Group className="mb-3" controlId="userName">
          <FloatingLabel
            controlId="userName"
            label="Your user name"
            className="mb-3"
          >
            <Form.Control
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userName}
                placeholder="Your user name"
                className={authError ? 'is-invalid' : ''}
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
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="Your user name"
                className={authError ? 'is-invalid' : ''}
              />
              <Form.Text className="text-danger">
                {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
                ) : null}
              </Form.Text>
              {authError && (<div className="invalid-tooltip">{authError}</div>)}
          </FloatingLabel>
          <Button className="w-100 mb-3 btn btn-outline-primary" variant="outline-primary" type="submit">
            Submit
          </Button>   
        
        </Form.Group>
      </Form>

      <div className="text-center">
        <Button onClick={test} className="mx-auto" variant="warning">Test</Button>
      </div>
    </div>
  )
}
