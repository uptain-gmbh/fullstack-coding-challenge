import React from 'react'
import {connect} from 'react-redux'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {reduxForm, Field} from 'redux-form'
const validate = values => {
    const errors = {}

    if(!values.item){
        errors.item = 'Required'
    }
    else if(values.item < 5){
        errors.item = 'must be more than 5 characters'
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
let ItemForm = (props) => {
    const { handleSubmit } = props
    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className = 'input-field'>
                    <Field name="item" component={renderField} type="text" label="Item" />
                </div>
                <button type="submit">Submit</button>
             </form>
          </div>
    )
       
}
 
ItemForm= reduxForm({
    // a unique name for the form
    form: 'item',
    validate
  })(ItemForm)
  export default ItemForm