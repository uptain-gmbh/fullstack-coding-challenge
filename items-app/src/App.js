import './App.css';
import React, {Component} from 'react';
import Items from './components/items';

  class App extends Component {
    constructor() {
      super()
      this.state = {
       showMessage: false,
       items: [],
       itemTitle: "",
       itemDescripton: "" 
      }
      this.handleTitleChange = this.handleTitleChange.bind(this);
      this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        fetch('https://kbas93jyqe.execute-api.us-east-1.amazonaws.com/prod/items')
        .then(res => res.json())
        .then((data) => {
          this.setState({ items: data.body })
        })
    }

    _showMessage = (bool) => {
      this.setState({
        showMessage: bool
      });
    }

    handleTitleChange(e) {
      this.setState({itemTitle: e.target.value});
    }

    handleDescriptionChange(e) {
      this.setState({itemDescripton: e.target.value});
    }

    handleSubmit(event) {
      event.preventDefault();
      const data = {
        "title": this.state.itemTitle, "description": this.state.itemDescripton
      }

      fetch('https://kbas93jyqe.execute-api.us-east-1.amazonaws.com/prod/item', {
        method: 'POST',
        headers: new Headers({
        'Content-Type': 'application/json'
      }), 
        body: JSON.stringify(data),
      }).then((r) => fetch('https://kbas93jyqe.execute-api.us-east-1.amazonaws.com/prod/items')
      .then(res => res.json())
      .then((data) => {
        this.setState({ items: data.body })
      }));
    }

    render() {
      const title = this.state.itemTitle;
      const description = this.state.itemDescripton;
      return (
        <div>
          <div>
            <h1>Welcome to Items App</h1>
            <button onClick={this._showMessage.bind(null, true)}>Display Items</button>
            <button onClick={this._showMessage.bind(null, false)}>Hide Items</button>
            { this.state.showMessage && (<Items items={this.state.items} />) }
          </div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="title"
              value={title}
              onChange={this.handleTitleChange}
            />
            <input
              type="text"
              name="description"
              value={description}
              onChange={this.handleDescriptionChange}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    }
  }

export default App;
