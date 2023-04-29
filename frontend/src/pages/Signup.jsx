import { useFormik } from 'formik';
import * as Yup from 'yup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { FocusError } from 'focus-formik-error'

import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import { useAuth } from '../contexts/AuthContext';

import routes from '../routes.js';

import toast from './components/toasts.js';

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
        navigate('/');
      })
      .catch((err) => {
        console.log('Err: ', err.response.data);
        // formik.setTouched({passwordConfirm: null})
        formik.setTouched({});
        formik.setSubmitting(false);
        const { error } = err.response.data;

        // const errorText = error === 'Conflict' ? t('signupForm.errors.userExist') : error;
        // setSignupError(errorText);

        if (error === 'Conflict') {
          setSignupError(t('signupForm.errors.userExist'));
        } else {
          toast.error(t('errors.connection'));
        }
      });
  };
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .required(t('signupForm.errors.requiredField'))
        .min(3, t('signupForm.errors.userNameLength'))
        .max(20, t('signupForm.errors.userNameLength')),
      password: Yup.string()
        .required(t('signupForm.errors.requiredField'))
        .min(6, t('signupForm.errors.passwordLength')),
      passwordConfirm: Yup.string()
        .required(t('signupForm.errors.requiredField'))
        .oneOf([Yup.ref('password'), null], t('signupForm.errors.passwordConfirm')),
    }),
    onSubmit: (values) => {
      createUser(values);
    },
    // validateOnChange: false,
    // validateOnBlur: false,
  });
  // console.log('Formik: ', formik)
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
              className={signupError || (formik.touched.password && formik.errors.password) ? 'is-invalid' : ''}
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
            controlId="passwordConfirm"
            label={t('signupForm.passwordConfirm')}
            className="mb-3"
          >
            <Form.Control
              name="passwordConfirm"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.passwordConfirm}
              placeholder={t('signupForm.passwordConfirmation')}
              className={signupError || (formik.touched.passwordConfirm && formik.errors.passwordConfirm) ? 'is-invalid' : ''}
            />
            <Form.Text className="text-danger">
              {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
                <div>{formik.errors.passwordConfirm}</div>
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
  );
};
