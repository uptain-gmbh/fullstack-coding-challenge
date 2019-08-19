import React, { Component } from 'react';

class List extends Component {
	state = { isLoaded: false, models: [] };

	componentDidMount() {
		fetch('/api/getAllBasketItems', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				mode: 'no-cors',
				'Content-Type': 'application/json'
			}
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					throw Error(res.statusText);
				}
			})
			.then((json) => {
				this.setState({
					models: json
				});
			});
	}

	render() {
		const { models } = this.state;

		return <div>{models.map((model) => <div key={model.BASKET_ID}>{model.STUFF}</div>)}</div>;
	}
}

export default List;
