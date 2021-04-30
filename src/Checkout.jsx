import * as Yup from 'yup';
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
} from 'formik';
import React, { useState } from 'react';

import { saveShippingAddress } from './services/shippingService';
import { useCart } from './contexts/cartContext';

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

const checkoutSchema = Yup.object().shape({
  city: Yup.string().required('City is required.'),
  country: Yup.string().required('Country is required'),
});

const Checkout = () => {
  const { dispatch } = useCart();
  const [saveError, setSaveError] = useState(null);

  const handleSubmit = async (address, formikProps) => {
    const {
      setStatus,
      setSubmitting,
    } = formikProps;
    try {
      await saveShippingAddress(address);
      dispatch({ type: 'empty' });
      setSubmitting(false);
      setStatus(STATUS.COMPLETED);
    } catch (error) {
      setSaveError(error);
    }
  };

  return (
    <Formik
      initialValues={emptyAddress}
      validationSchema={checkoutSchema}
      onSubmit={handleSubmit}
    >
      {({
        errors: validationErrors,
        isValid,
        status = STATUS.IDLE,
      }) => {
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
          <Form>
            <h1>Shipping Info</h1>
            {!isValid && status === STATUS.SUBMITTED && (
              <div role='alert'>
                <p>Please fix the following errors:</p>
                <ul>
                  {Object.keys(validationErrors).map((key) => <li key={key}>{validationErrors[key]}</li>)}
                </ul>
              </div>
            )}
            <div>
              <label htmlFor='city'>City</label>
              <br />
              <Field
                name='city'
                type='text'
              />
              <ErrorMessage
                component='p'
                name='city'
                role='alert'
              />
            </div>
            <div>
              <label htmlFor='country'>Country</label>
              <br />
              <Field
                as='select'
                name='country'
              >
                <option value=''>Select Country</option>
                <option value='China'>China</option>
                <option value='India'>India</option>
                <option value='United Kingodom'>United Kingdom</option>
                <option value='USA'>USA</option>
              </Field>
              <ErrorMessage
                component='p'
                name='country'
                role='alert'
              />
            </div>
            <div>
              <input
                className='btn btn-primary'
                disabled={status === STATUS.SUBMITTING}
                type='submit'
                value='Save Shipping Info'
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Checkout;
