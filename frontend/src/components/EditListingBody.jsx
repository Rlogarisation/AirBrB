import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Row, Col, Button, Image } from 'react-bootstrap';
import MessageModal from './MessageModal';
import { fileToDataUrl } from '../utils/helpers';

const EditListingBody = ({ listingId }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  // let thumbnailCopy = '';

  const amenities = ['Free Wi-Fi', 'AC', 'Kitchen', 'Mini-Bar', 'Separate Bathroom'];

  const getThumbnail = async () => {
    // I dont know how to handle file upload with Formik so have to use getElementById...
    const elem = document.getElementById('thumbnail');
    const file = elem.files[0];
    const res = await fileToDataUrl(file);
    return res;
  }

  const editListing = async (values) => {
    const resp = await fetch(`http://localhost:5005/listings/${listingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({
        title: values.title,
        price: values.price,
        address: {
          street: values.street,
          suburb: values.suburb,
          city: values.city,
          state: values.state,
          zip: values.zip,
          country: values.country,
        },
        thumbnail: getThumbnail(), // TODO change thumbnail
        metadata: {
          beds: values.beds,
          bedrooms: values.bedrooms,
          type: values.type,
          amenities: {
            wifi: values.wifi,
            ac: values.ac,
            kitchen: values.kitchen,
            miniBar: values.miniBar,
            sepBathroom: values.sepBathroom,
          }
        }
      })
    })
    if (!resp.ok) {
      setShowModal(true);
    } else {
      navigate('/myListings');
      // if the user wants to publish this listing, then fetch again
      const resp1 = await fetch('http://localhost:5005/listings/publish/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        }
      });
      if (!resp1.ok) {
        setShowModal(true);
      }
    }
  }

  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [beds, setBeds] = React.useState(0);
  const [bedrooms, setBedrooms] = React.useState(0);
  const [wifi, setWifi] = React.useState(false);
  const [ac, setAc] = React.useState(false);
  const [kitchen, setKitchen] = React.useState(false);
  const [miniBar, setMiniBar] = React.useState(false);
  const [sepBathroom, setSepBathroom] = React.useState(false);
  const [type, setType] = React.useState('');
  const [thumbnail, setThumbnail] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [suburb, setSuburb] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [zip, setZip] = React.useState(0);
  const [country, setCountry] = React.useState('');
  const [published, setPublished] = React.useState(false);

  React.useEffect(async () => {
    const resp = await fetch(`http://localhost:5005/listings/${listingId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await resp.json();
    // set everything
    setTitle(data.listing.title);
    setPrice(data.listing.price);
    setBeds(data.listing.metadata.beds);
    setBedrooms(data.listing.metadata.bedrooms);
    setWifi(data.listing.metadata.amenities.wifi);
    setAc(data.listing.metadata.amenities.ac);
    setKitchen(data.listing.metadata.amenities.kitchen);
    setMiniBar(data.listing.metadata.amenities.miniBar);
    setSepBathroom(data.listing.metadata.amenities.sepBathroom);
    setType(data.listing.metadata.type);
    setThumbnail(data.listing.thumbnail);
    setStreet(data.listing.address.street);
    setSuburb(data.listing.address.suburb);
    setCity(data.listing.address.city);
    setState(data.listing.address.state);
    setZip(data.listing.address.zip);
    setCountry(data.listing.address.country);
    setPublished(data.listing.published);
    setLoading(false);
    // thumbnailCopy = data.listing.thumbnail;
  }, []);

  const schema = Yup.object({
    title: Yup.string()
      .min(10, '\'title\' cannot be shorter than 10 characters')
      .required(),
    price: Yup.number().required()
      .positive('Price must be a positive number'),
    street: Yup.string().required(),
    suburb: Yup.string().required(),
    city: Yup.string().required(),
    state: Yup.string().required(),
    zip: Yup.number()
      .required()
      .positive('Please provide a valid zip')
      .integer('Please provide a valid zip'),
    country: Yup.string().required(),
    type: Yup.string()
      .oneOf(['apartment', 'house', 'townhouse', 'duplex']),
    beds: Yup.number()
      .required()
      .positive('Number of beds must be a positive integer')
      .integer('Number of beds must be a positive integer'),
    bedrooms: Yup.number()
      .required()
      .positive('Number of bedrooms must be a positive integer')
      .integer('Number of bedrooms must be a positive integer'),
    wifi: Yup.bool().required(),
    kitchen: Yup.bool().required(),
    ac: Yup.bool().required(),
    miniBar: Yup.bool().required(),
    sepBathroom: Yup.bool().required(),
    published: Yup.bool().required(),
  })

  // TODO render a form which is filled with the data we fetched
  // TODO what happen if the editing succeeds ?
  // TODO what happen if the editing fails ?
  return (
    <>
      { !loading && <Formik
        initialValues={{
          title: title,
          price: price,
          thumbnail: thumbnail,
          street: street,
          suburb: suburb,
          city: city,
          state: state,
          zip: zip,
          country: country,
          type: type,
          beds: beds,
          bedrooms: bedrooms,
          wifi: wifi,
          ac: ac,
          kitchen: kitchen,
          miniBar: miniBar,
          sepBathroom: sepBathroom,
          published: published,
        }}
        validationSchema={ schema }
        onSubmit={ values => editListing(values) }
        validator={ () => ({}) }
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
          setValues,
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
                    isInvalid={ errors.title }
                  />
                  <Form.Control.Feedback type='invalid'>
                    Title cannot be shorter than 10 characters
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Type*</Form.Label>
                  <Form.Select aria-label='Select listing type'>
                    <option>Listing property type</option>
                    <option value='house'>House</option>
                    <option value='townhouse'>Town house</option>
                    <option value='apartment'>Apartment</option>
                    <option value='duplex'>Duplex</option>
                  </Form.Select>
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
                  />
                  <Form.Control.Feedback type='invalid'>
                    Street address is required
                  </Form.Control.Feedback>
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
                  />
                  <Form.Control.Feedback type='invalid'>
                    Suburb is required
                  </Form.Control.Feedback>
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
                  />
                  <Form.Control.Feedback type='invalid'>
                    City is required
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className='mb-4'>
              <Col>
                <Form.Group>
                  <Form.Label>State*</Form.Label>
                  <Form.Control
                    type='text'
                    name='state'
                    value={ values.state }
                    onChange={ handleChange }
                    isInvalid={ !!errors.state }
                  />
                  <Form.Control.Feedback type='invalid'>
                    State is required
                  </Form.Control.Feedback>
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
                  />
                  <Form.Control.Feedback type='invalid'>
                    Zip is required
                  </Form.Control.Feedback>
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
                  />
                  <Form.Control.Feedback type='invalid'>
                    Country is required
                  </Form.Control.Feedback>
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
                />
                <Form.Control.Feedback type='invalid'>
                  Price must be a positive number
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className='mb-3'>
              <Form.Group>
                <h3>Amenities</h3>
                { amenities.map((amenity, idx) => {
                  return (
                    <Form.Check
                      label={ amenity }
                      type='checkbox'
                      key={ idx }
                    />
                  )
                })}
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
                  <Form.Control.Feedback type='invalid'>
                    Number of bedrooms must be a positive number
                  </Form.Control.Feedback>
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
                  <Form.Control.Feedback type='invalid'>
                    Number of beds must be a positive number
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className='mb-5'>
              <Image src={ thumbnail } />
              <h3>Change your listing thumbnail maybe?</h3>
              <Form.Control
                type='file'
                accept='image/*'
                name='thumbnail'
                id={'thumbnail'}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Check
                label='Go live?'
                type='checkbox'
              />
            </Form.Group>
            <Button
              variant='primary'
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
      </Formik> }
      <MessageModal
        show={ showModal }
        message={ 'Oops! Something went wrong, cannot edit the listing!' }
        handleClose={ () => setShowModal(false) }
      />
    </>
  );
}

EditListingBody.propTypes = {
  listingId: PropTypes.string,
}

export default EditListingBody;
