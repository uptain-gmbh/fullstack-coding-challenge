import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { reduxForm, Field } from 'redux-form'

const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Required'
  }
  else if (values.firstName < 2) {
    errors.firstName = 'must be more than 2 characters'
  }

  if (!values.lastName) {
    errors.lastName = 'Required'
  }
  else if (values.lastName < 2) {
    errors.lastName = 'must be more than 2 characters'
  }

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'Required'
  }
  else if (values.password < 5) {
    errors.password = 'must be more than 5 characters'
  }
  return errors
}

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched &&
          ((error && <span class='red-text'>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  )

let SignupForm = props => {
  const { handleSubmit } = props

  return (
    <div className='container'>
      <h3>SignUp form</h3>
      <form onSubmit={handleSubmit}>
        <div className='input-field'>
          <Field name="firstName" component={renderField} type="text" label="First Name" />
        </div>
        <div className='input-field'>
          <Field name="lastName" component={renderField} type="text" label="Last Name" />
        </div>

        <div className='input-field'>
          <Field name="email" component={renderField} type="email" label="Email" />
        </div>

        <div className='input-field'>
          <Field name="password" component={renderField} type="password" label="Password" />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>

  )
}
SignupForm = reduxForm({
  // a unique name for the form
  form: 'signup',
  validate
})(SignupForm)
export default SignupForm