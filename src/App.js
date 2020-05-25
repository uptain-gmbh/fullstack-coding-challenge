import React, { Component } from 'react';
import './App.css';
import { red } from 'color-name';

const post_url = 'https://26ggy7h8p5.execute-api.eu-central-1.amazonaws.com/dev/addItems';
const get_url = 'https://26ggy7h8p5.execute-api.eu-central-1.amazonaws.com/dev/getItems';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '', itemList:[], resultStatus: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayList = this.displayList.bind(this);
    this.handleClick = this.handleClick.bind(this);    
  }
  postTask(value) {
    fetch(post_url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'item': value })
    }).then(res => {
      this.setState({resultStatus: true});
    });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    this.setState({ resultStatus: false });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.postTask(this.state.value);
  }

  displayList() {
    return this.state.itemList.map((x,index) => {
    return <tr><td>{index+1}</td><td>{x.item}</td></tr>
    });
  }
  handleClick() {
    fetch(get_url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => res.json()).then(data => {
      this.setState({ itemList: data });
    });
  }

  render() {
    return (
      <div className="wrapper">
        <h1>Items Tracker App</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Add Item:&nbsp;&nbsp;
          <input required type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input className="add" type="submit" value="Add" />
        </form>
        <p style={{color: 'red'}}>{this.state.resultStatus && 'Successfully added to the list'}</p>
        <button onClick={this.handleClick} >VIEW LIST</button>
        <table>
          <tr>
            <th>Index number</th>
            <th>Item name</th>
          </tr>
          {this.displayList()}
        </table>
      </div>
    );
  }
}

export default App;