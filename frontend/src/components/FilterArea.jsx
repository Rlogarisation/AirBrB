import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, Form, Row } from 'react-bootstrap';
import ModalDisplaySearchFilter from './ModalDisplaySearchFilter';
// Other form inputs should also exist that allow the user to search by:
//
// Number of bedrooms (a minimum and maximum number of bedrooms, expressed either via text fields or a slider)
// Date range (two date fields)
// Price (a minimum and maximum price, expressed either via text fields or a slider)
// Review ratings:
//
//    Sort results from highest to lowest review rating or from lowest to highest review rating depending
// If there is more than one listing with the same rating, their order does not matter
const FilterArea = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const schema = yup.object().shape({
    minBed: yup.number().positive().integer(),
    maxBed: yup.number().positive().integer(),
    checkIn: yup.date().required(),
    checkOut: yup.date().required(),
    minPrice: yup.number().positive().integer(),
    maxPrice: yup.number().positive().integer(),
    order: yup.bool(),
  });

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values) =>
        setModalShow(true)
        }
      initialValues={{
        minBed: '',
        maxBed: '',
        minPrice: '',
        maxPrice: '',
        checkIn: '',
        checkOut: '',
        order: true,
      }}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        touched,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit} data-testid="FormSubmitHandle">
          <Row className="mb-3">
            <Form.Group md="4" controlId="minBed">
              <Form.Label>Minimum bedrooms</Form.Label>
              <Form.Control
                data-testid="FormMinBed"
                type="number"
                placeholder="Minimum number of bedrooms"
                name="minBed"
                value={values.minBed}
                onChange={handleChange}
                isValid={touched.minBed && !errors.minBed}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group md ="4" controlId="maxBed">
              <Form.Label>Maximum bedrooms</Form.Label>
              <Form.Control
                data-testid="FormMaxBed"
                type="number"
                placeholder="Maximum number of bedrooms"
                name="maxBed"
                value={values.maxBed}
                onChange={handleChange}
                isValid={touched.maxBed && !!errors.maxBed}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group md="6" controlId="minPrice">
              <Form.Label>Minimum price range</Form.Label>
              <Form.Control
                data-testid="FormMinPrice"
                type="number"
                placeholder="Minimum price"
                name="minPrice"
                value={values.minPrice}
                onChange={handleChange}
                isInvalid={!!errors.minPrice}
              />
            </Form.Group>
            <Form.Group md="3" controlId="maxPrice">
              <Form.Label>Maximum price range</Form.Label>
              <Form.Control
                data-testid="FormMaxPrice"
                type="number"
                placeholder="Maximum price"
                name="maxPrice"
                value={values.maxPrice}
                onChange={handleChange}
                isInvalid={!!errors.maxPrice}
              />
            </Form.Group>
          </Row>
            <Form.Group md="3" controlId="checkIn">
              <Form.Label>Check in</Form.Label>
              <Form.Control
                data-testid="FormCheckin"
                type="date"
                name="checkIn"
                value={values.checkIn}
                onChange={handleChange}
                isInvalid={!!errors.checkIn}
              />
            </Form.Group>
            <Form.Group md="3" controlId="checkOut">
              <Form.Label>Check out</Form.Label>
              <Form.Control
                data-testid="FormCheckout"
                type="date"
                name="checkOut"
                value={values.checkOut}
                onChange={handleChange}
                isInvalid={!!errors.checkOut}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                data-testid="FormCheckbox"
                type="checkbox"
                name="order"
                label={'Sort results from highest to lowest review rating'}
                value={values.order}
                onChange={handleChange}
              />
            </Form.Group>
          <Button type="submit" data-testid="FormSubmitButton">Search with filters</Button>
          <ModalDisplaySearchFilter
            show={modalShow}
            onHide={() => setModalShow(false)}
            values = {values}
          />
        </Form>
      )}
    </Formik>
  );
}

export default FilterArea;
