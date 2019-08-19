import React, { Component } from 'react';
import { FormErrors } from './FormErrors.js';
import './Form.css';

class Form extends Component {
	state;
	constructor(props) {
		super(props);
		this.state = {
			item: '',
			formErrors: { item: '' },
			itemValid: false,
			formValid: false
		};
	}

	handleUserInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({ [name]: value }, () => {
			this.validateField(name, value);
		});
	};

	validateField(fieldName, value) {
		let fieldValidationErrors = this.state.formErrors;
		let itemValid = this.state.itemValid;

		switch (fieldName) {
			case 'item':
				itemValid = value.length >= 1;
				fieldValidationErrors.item = itemValid ? '' : ' not valid';
				break;
			default:
				break;
		}
		this.setState(
			{
				formErrors: fieldValidationErrors,
				itemValid: itemValid
			},
			this.validateForm
		);
	}

	validateForm() {
		this.setState({ formValid: this.state.itemValid });
	}

	errorClass(error) {
		return error.length === 0 ? '' : 'has-error';
	}

	handleSubmit(event) {
		event.preventDefault();
		const data = new FormData(event.target);
		const postData = { STUFF: data.get('item') };
		fetch('/api/addBasketItem', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(postData)
		});
	}

	render() {
		return (
			<form className="inputForm" onSubmit={this.handleSubmit}>
				<div className="panel panel-default">
					<FormErrors formErrors={this.state.formErrors} />
				</div>
				<div className={`form-group ${this.errorClass(this.state.formErrors.item)}`}>
					<label htmlFor="item">Add item to basket</label>
					<input
						type="text"
						required
						className="form-control"
						name="item"
						placeholder="item"
						value={this.state.item}
						onChange={this.handleUserInput}
					/>
				</div>

				<button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>
					Add to Basket
				</button>
			</form>
		);
	}
}

export default Form;
