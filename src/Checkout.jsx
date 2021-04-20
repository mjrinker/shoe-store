import React, { useState } from 'react';

import { saveShippingAddress } from './services/shippingService';

const STATUS = {
  COMPLETED: 'COMPLETED',
  IDLE: 'IDLE',
  SUBMITTED: 'SUBMITTED',
  SUBMITTING: 'SUBMITTING',
};

// Declaring outside component to avoid recreation on each render
const emptyAddress = {
  city: '',
  country: '',
};

const Checkout = ({ dispatch }) => {
  const [address, setAddress] = useState(emptyAddress);
  const [saveError, setSaveError] = useState(null);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [touched, setTouched] = useState({});

  const validate = (address) => ({
    ...address.city ? {} : { city: 'City is required' },
    ...address.country ? {} : { country: 'Country is required' },
  });

  const validationErrors = validate(address);
  const isValid = Object.keys(validationErrors).length === 0;

  const handleChange = (event) => {
    setAddress((currentAddress) => ({
      ...currentAddress,
      [event.target.id]: event.target.value,
    }));
  };

  const handleBlur = (event) => {
    setTouched((currentTouchedFields) => ({
      ...currentTouchedFields,
      [event.target.id]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(STATUS.SUBMITTING);
    if (isValid) {
      try {
        await saveShippingAddress(address);
        dispatch({ type: 'empty' });
        setStatus(STATUS.COMPLETED);
      } catch (error) {
        setSaveError(error);
      }
    } else {
      setStatus(STATUS.SUBMITTED);
    }
  };

  if (saveError) {
    throw saveError;
  }

  if (status === STATUS.COMPLETED) {
    return (
      <>
        <h2>Thanks for shopping!</h2>
        <h4>Your order has been submitted.</h4>
      </>
    );
  }

  return (
    <>
      <h1>Shipping Info</h1>
      {!isValid && status === STATUS.SUBMITTED && (
        <div role='alert'>
          <p>Please fix the following errors:</p>
          <ul>
            {Object.entries(validationErrors).map(([key, message]) => <li key={key}>{message}</li>)}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='city'>City</label>
          <br />
          <input
            id='city'
            onBlur={handleBlur}
            onChange={handleChange}
            type='text'
            value={address.city}
          />
          <p role='alert'>
            {(touched.city || status === STATUS.SUBMITTED) && validationErrors.city}
          </p>
        </div>

        <div>
          <label htmlFor='country'>Country</label>
          <br />
          <select
            id='country'
            onBlur={handleBlur}
            onChange={handleChange}
            value={address.country}
          >
            <option value=''>Select Country</option>
            <option value='China'>China</option>
            <option value='India'>India</option>
            <option value='United Kingdom'>United Kingdom</option>
            <option value='USA'>USA</option>
          </select>
          <p role='alert'>
            {(touched.country || status === STATUS.SUBMITTED) && validationErrors.country}
          </p>
        </div>

        <div>
          <input
            className='btn btn-primary'
            disabled={status === STATUS.SUBMITTING}
            type='submit'
            value='Save Shipping Info'
          />
        </div>
      </form>
    </>
  );
};

export default Checkout;
