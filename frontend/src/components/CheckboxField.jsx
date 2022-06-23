import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';

const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className='mb-3'>
      <label htmlFor={field.name }>{ label }</label>
      <input
        className={ `form-control ${meta.touched && meta.error && 'is-invalid'}`}
        { ...field }
        { ...props }
        autoComplete='off'
      />
    </div>
  )
}

TextField.propTypes = {
  label: PropTypes.string,
  props: PropTypes.object,
}

export default TextField;
