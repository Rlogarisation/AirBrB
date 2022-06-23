import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import MessageModal from './MessageModal';
import * as Yup from 'yup';

const SignUp = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const navigate = useNavigate();

  const signup = async (values) => {
    const { name, email, password } = values;
    /* TODO this fetch not working with the backend yet */
    const resp = await fetch('http://localhost:5005/user/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });
    if (!resp.ok) {
      setShowModal(true);
    } else {
      const data = await resp.json();
      localStorage.setItem('isLogin', 'true');
      localStorage.setItem('token', data.token);
      localStorage.setItem('userEmail', email);
      navigate('/');
    }
  }

  const schema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .max(30, 'Name must be no longer than 30 characters'),
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be no shorter than 6 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={ schema }
        onSubmit={ values => signup(values) }
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
          <Form noValidate data-testid="form" onSubmit={ handleSubmit }>
            <Form.Group className='mb-3'>
              <Form.Label>Name*</Form.Label>
              <Form.Control
                data-testid="signUpName"
                type='text'
                name='name'
                value={ values.name }
                onChange={ handleChange }
                isValid={ touched.name && !errors.name }
                isInvalid={ !!errors.name }
                placeholder='Enter your name'
              />
              <Form.Control.Feedback type='invalid'>Name cannot be longer than 30 characters</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Email*</Form.Label>
              <Form.Control
                data-testid="signUpEmail"
                type='email'
                name='email'
                value={ values.email }
                onChange={ handleChange }
                isInvalid={ !!errors.email }
                placeholder='E.g. example@email.com'
              />
              <Form.Control.Feedback type='invalid'>Please enter a valid email</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Password*</Form.Label>
              <Form.Control
                data-testid="signUpPassword"
                type={ showPassword ? 'text' : 'password'}
                name='password'
                value={ values.password }
                onChange={ handleChange }
                isInvalid={ !!errors.password }
                placeholder='Enter password'
              />
              <Form.Control.Feedback type='invalid'>Password cannot be shorter than 6 characters</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Confirm password*</Form.Label>
              <Form.Control
                data-testid="confirmSignUpPassword"
                type={ showPassword ? 'text' : 'password'}
                name='confirmPassword'
                value={ values.confirmPassword }
                onChange={ handleChange }
                isInvalid={ !!errors.confirmPassword }
                placeholder='Enter password again'
              />
              <Form.Control.Feedback type='invalid'>Passwords do not match</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Check
                required
                data-testid="showingPassword"
                name='showPassword'
                label='Show passwords'
                onChange={ () => setShowPassword(!showPassword) }
              />
            </Form.Group>
            <Button data-testid="signupBottom" type='submit'>
              Sign up
            </Button>
            <Form.Group data-testid="signInPromo">
              Already have an account? Click
              <Button
                variant='link'
                onClick={ () => navigate('/login')}
              >
                here
              </Button>
              to sign in
            </Form.Group>
          </Form>
        )}
      </Formik>
      <MessageModal
        show={ showModal }
        message={ 'Oops! Registration failed, something went wrong!' }
        handleClose={ () => setShowModal(false) }
      />
    </>
  );
}

export default SignUp;
