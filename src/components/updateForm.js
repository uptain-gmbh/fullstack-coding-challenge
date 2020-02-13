import React, {Component} from 'react'
import {reduxForm, Field} from 'redux-form'

const validate = values => {
    const errors = {}

    if(!values.change){
        errors.change = 'Required'
    }
    else if(values.change < 2){
        errors.change = 'must be more than 2 characters'
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
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched &&
          ((error && <span class='red-text'>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  )
const inputFieldStyles = {
    position:'relative'
}
const sendStyles = {
    position:'absolute',
    right:'0',
    top:'50%',
    transform:'translateY(-50%)',
    border:'none',
    background:'none',
    color:'deepSkyBlue'
}

  let UpdateForm = props => {
    const { handleSubmit } = props
    return (
        <div className=''>
            <form onSubmit={handleSubmit}>
                <div className = 'input-field'>
                    <Field name="change" component={renderField} type="text" label="change" style={inputFieldStyles} />
                    <button type="submit" style={sendStyles} className='hover-affected-button'><i class="material-icons ">send</i></button>
                </div>
                
            </form>
          </div>
    )
  }
  UpdateForm= reduxForm({
    // a unique name for the form
    form: 'update',
    validate
  })(UpdateForm)
  export default UpdateForm