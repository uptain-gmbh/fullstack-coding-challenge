import React, {Component} from 'react';

class Form extends Component {
    constructor(props) {
        super(props);
        
        this.initialState = {
            itemId: '',
            name: ''
        };

        this.state = this.initialState;
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name] : value
        });
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        
        this.props.handleSubmit(this.state);
        // reset form
        this.setState(this.initialState);
    }

    render() {
        const { name, itemId } = this.state; 

        return (
            <form onSubmit={this.onFormSubmit}>
                <label htmlFor="name">Name</label>
                <input 
                    type="text" 
                    name="name" 
                    id="name"
                    value={name} 
                    onChange={this.handleChange} />
                <label htmlFor="itemId">Id</label>
                <input 
                    type="text" 
                    name="itemId" 
                    id="itemId"
                    value={itemId} 
                    onChange={this.handleChange} />
                <button type="submit" style={{float: 'right'}}>
                    Submit
                </button>
            </form>
        );
    }
}
export default Form;