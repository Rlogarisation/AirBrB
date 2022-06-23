import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import MessageModal from './MessageModal';
import { fileToDataUrl } from '../utils/helpers';

const CreateListingBody = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = React.useState(false);

  const getThumbnail = async () => {
    const elem = document.getElementById('thumbnail');
    const file = elem.files[0];
    const res = await fileToDataUrl(file);
    return res;
  }

  const createListing = async (vals) => {
    const resp = await fetch('http://localhost:5005/listings/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({
        title: vals.title,
        price: vals.price,
        address: {
          street: vals.street,
          city: vals.city,
          suburb: vals.suburb,
          state: vals.state,
          zip: vals.zip,
          country: vals.country,
        },
        thumbnail: getThumbnail(),
        metadata: {
          beds: vals.beds,
          bedrooms: vals.bedrooms,
          type: vals.type,
          amenities: {
            wifi: vals.wifi,
            miniBar: vals.miniBar,
            ac: vals.ac,
            kitchen: vals.kitchen,
            sepBathroom: vals.sepBathroom,
          }
        }
      })
    });
    if (!resp.ok) {
      const err = await resp.json();
      console.log(err);
      setShowModal(true);
    } else {
      // TODO
      const data = await resp.json();
      console.log(data);
    }
  }

  // TODO write proper error message for schema
  const schema = Yup.object({
    title: Yup.string()
      .min(10, '\'title\' cannot be shorter than 10 characters')
      .required(),
    street: Yup.string().required(),
    suburb: Yup.string().required(),
    city: Yup.string().required(),
    state: Yup.string().required(),
    zip: Yup.number()
      .required()
      .positive('Please provide a valid zip')
      .integer('Please provide a valid zip'),
    country: Yup.string().required(),
    price: Yup.number()
      .required()
      .positive('Price must be a positive number'),
    bedrooms: Yup.number()
      .required()
      .positive('Number of bedrooms must be a positive integer')
      .integer('Number of bedrooms must be a positive integer'),
    beds: Yup.number()
      .required()
      .positive('Number of beds must be a positive integer')
      .integer('Number of beds must be a positive integer'),
    type: Yup.string()
      .oneOf(['apartment', 'house', 'townhouse', 'duplex']),
  });

  return (
    // TODO make property amenities using check-boxes
    <>
      <Formik
        initialValues={{
          title: '',
          street: '',
          suburb: '',
          city: '',
          state: '',
          zip: '',
          country: '',
          price: 0,
          bedrooms: 1,
          beds: 1,
          wifi: false,
          ac: false,
          kitchen: false,
          miniBar: false,
          sepBathroom: false,
        }}
        validationSchema={ schema }
        onSubmit={ values => {
          console.log(values);
          createListing(values);
        } }
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
        }) => (
          <Form noValidate onSubmit={ handleSubmit }>
            <Row className='mb-5 mt-3'>
              <Col xs={8}>
                <Form.Group>
                  <Form.Label>Title*</Form.Label>
                  <Form.Control
                    type='text'
                    name='title'
                    value={ values.title }
                    onChange={ handleChange }
                    isInvalid={ !!errors.title }
                    isValid={ touched.title && !errors.title }
                    placeholder='Give a title to your new listing'
                  />
                  <Form.Control.Feedback type='invalid'>Title cannot be shorter than 10 characters</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Type*</Form.Label>
                  <Form.Select aria-label='Select listing type'>
                    <option>What property type is your listing?</option>
                    <option value='house'>House</option>
                    <option value='townhouse'>Town house</option>
                    <option value='apartment'>Apartment</option>
                    <option value='duplex'>Duplex</option>
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>Please select a property type</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className='mb-3'>
              <h3>Listing Address</h3>
              <Col>
                <Form.Group>
                  <Form.Label>Street Address*</Form.Label>
                  <Form.Control
                    type='text'
                    name='street'
                    value={ values.street }
                    onChange={ handleChange }
                    isInvalid={ !!errors.street }
                    isValid={ touched.street && !errors.street }
                    placeholder='Street and number, do not enter P.O. box address'
                  />
                  <Form.Control.Feedback type='invalid'>Street address is required</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Suburb*</Form.Label>
                  <Form.Control
                    type='text'
                    name='suburb'
                    value={ values.suburb }
                    onChange={ handleChange }
                    isInvalid={ !!errors.suburb }
                    isValid={ touched.suburb && !errors.suburb }
                    placeholder='What is the suburb of the listing?'
                  />
                  <Form.Control.Feedback type='invalid'>Suburb is required</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>City*</Form.Label>
                  <Form.Control
                    type='text'
                    name='city'
                    value={ values.city }
                    onChange={ handleChange }
                    isInvalid={ !!errors.city }
                    isValid={ touched.city && !errors.city }
                    placeholder='What is the city of the listing?'
                  />
                  <Form.Control.Feedback type='invalid'>City is required</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className='mb-5'>
              <Col>
                <Form.Group>
                  <Form.Label>State*</Form.Label>
                  <Form.Control
                    type='text'
                    name='state'
                    value={ values.state }
                    onChange={ handleChange }
                    isInvalid={ !!errors.state }
                    isValid={ touched.suburb && !errors.suburb }
                    placeholder='What is the state of the listing?'
                  />
                  <Form.Control.Feedback type='invalid'>State is required</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Zip*</Form.Label>
                  <Form.Control
                    type='number'
                    name='zip'
                    value={ values.zip }
                    onChange={ handleChange }
                    isInvalid={ !!errors.zip }
                    isValid={ touched.zip && !errors.zip }
                    placeholder='What is the zip of the listing?'
                  />
                  <Form.Control.Feedback type='invalid'>Zip is required</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Country*</Form.Label>
                  <Form.Control
                    type='text'
                    name='country'
                    value={ values.country }
                    onChange={ handleChange }
                    isInvalid={ !!errors.country }
                    isValid={ touched.country && !errors.country }
                    placeholder='Which country the listing is in?'
                  />
                  <Form.Control.Feedback type='invalid'>Country is required</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className='mb-5'>
              <h3>Price*</h3>
              <Form.Group>
                <Form.Control
                  type='number'
                  name='price'
                  value={ values.price }
                  onChange={ handleChange }
                  isInvalid={ !!errors.price }
                  isValid={ touched.price && !errors.price }
                  placeholder='How much the listing charge per night?'
                />
                <Form.Control.Feedback type='invalid'>Price must be a positive number</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className='mb-4'>
              <Form.Group>
                <h3>Amenities</h3>
                <Form.Check
                  required
                  label='Free Wi-Fi'
                  value={ values.wifi }
                  type='checkbox'
                />
                <Form.Check
                  required
                  label='Air-Conditioning'
                  value={ values.ac }
                  type='checkbox'
                />
                <Form.Check
                  required
                  label='Kitchen'
                  value={ values.kitchen }
                  type='checkbox'
                />
                <Form.Check
                  required
                  label='Mini-Bar'
                  value={ values.miniBar }
                  type='checkbox'
                />
                <Form.Check
                  required
                  label='Separate Bathroom'
                  value={ values.sepBathroom }
                  type='checkbox'
                />
              </Form.Group>
            </Row>
            <Row className='mb-5'>
              <Col>
                <Form.Group>
                  <Form.Label>Number of bedrooms</Form.Label>
                  <Form.Control
                    type='number'
                    name='bedrooms'
                    value={ values.bedrooms }
                    onChange={ handleChange }
                    isInvalid={ !!errors.bedrooms }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Number of beds</Form.Label>
                  <Form.Control
                    type='number'
                    name='beds'
                    value={ values.beds }
                    onChange={ handleChange }
                    isInvalid={ !!errors.beds }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className='mb-5'>
              <h3>Showcase your listing!</h3>
              <Form.Group>
                <Form.Label>Upload pictures of your new listing:</Form.Label>
                <Form.Control
                  required
                  type='file'
                  accept='image/*'
                  name='thumbnail'
                  id='thumbnail'
                />
                <Form.Control.Feedback type={'invalid'}>Please provide an image</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button
              type='submit'
              size='lg'
            >
              Create
            </Button>
            {' '}
            <Button
              variant='danger'
              size='lg'
              onClick={ () => navigate('/myListings') }
            >
              Cancel
            </Button>
          </Form>
        )}
      </Formik>
      <MessageModal
        show={ showModal }
        message={ 'Oops! Something went wrong, cannot create the new listing!' }
        handleClose={ () => setShowModal(false) }
      />
    </>
  )
}

export default CreateListingBody;
