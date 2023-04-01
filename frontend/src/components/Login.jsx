import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export const Login = () => {
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
      console.log('Values :', values)
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
              />
              <Form.Text className="text-danger">
                {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
                ) : null}
              </Form.Text>
          </FloatingLabel>
          <Button className="w-100 mb-3 btn btn-outline-primary" variant="outline-primary" type="submit">
            Submit
          </Button>   
        
        </Form.Group>
      </Form>
    </div>
  )
}