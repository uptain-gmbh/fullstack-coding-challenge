import React, { Component } from 'react';
import './App.css';
import Form from './components/Form.js';
import List from './components/list';

class App extends Component {
	render() {
		return (
			<div className="App">
				<h2>Your Basket</h2>
				<Form />
				<List />
			</div>
		);
	}
}

export default App;
