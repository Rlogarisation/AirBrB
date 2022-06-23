import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import MessageModal from './MessageModal';

function Login () {
  // TODO: Did not link to the back end yet.
  const [showPassword, setShowPassword] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const navigate = useNavigate();

  const login = async (values) => {
    const { email, password } = values;
    const resp = await fetch('http://localhost:5005/user/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    if (!resp.ok) {
      setShowModal(true);
    } else {
      const data = await resp.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('isLogin', 'true');
      localStorage.setItem('userEmail', values.email);
      navigate('/');
    }
  }

  const schema = Yup.object({
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
  })

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={ schema }
        onSubmit={ values => login(values) }
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors
        }) => (
          <Form noValidate onSubmit={ handleSubmit }>
            <Form.Group className='mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                data-testid="LoginEmail"
                type='email'
                name='email'
                value={ values.email }
                onChange={ handleChange }
                isInvalid={ !!errors.email }
                isValid={ touched.email && !errors.email }
                placeholder='E.g. example@email.com'
              />
              <Form.Control.Feedback type='invalid'>Please enter a valid email</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                data-testid="LoginPassword"
                type={ showPassword ? 'text' : 'password'}
                name='password'
                value={ values.password }
                onChange={ handleChange }
                isInvalid={ !!errors.password }
                placeholder='Enter password'
              />
              <Form.Control.Feedback type='invalid'>Please enter password</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Check
                required
                data-testid="showingPassword"
                name='showPassword'
                label='Show passwords'
                onChange={ () => { setShowPassword(!showPassword) }}
              />
            </Form.Group>
            <Button data-testid="loginButton" name='loginInButton' type='submit'>
              Log in
            </Button>
            <Form.Group data-testid="signUpPromo">
              Do not have an account yet? Click
              <Button variant='link' onClick={ () => navigate('/register')}>
                here
              </Button>
              to sign up
            </Form.Group>
          </Form>
        )}
      </Formik>

      <MessageModal
        show={ showModal }
        message={ 'Oops! Log-in failed, email or password is incorrect!' }
        handleClose={ () => setShowModal(false) }
      />
    </>
  );
}

export default Login;
