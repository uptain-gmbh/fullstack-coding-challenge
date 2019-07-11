import React from 'react';
import './App.css';
import { Auth, API } from "aws-amplify";
import authConfig from "./authConfig";

// The Add Item Component to add a new item to the database.
class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {itemName: ""};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  // Handles the onChange event for the form input
  // No need to cater for different events, since we only have 1 form input
  handleChange(event) {
    this.setState({itemName: event.target.value});
  }

  // Handles the submit button for the form.
  // Adds the item to the list.
  // and provides feedback whether item name has been added or item name is empty.
  async handleSubmit(event) {
    event.preventDefault();
    if(this.state.itemName.length > 0){
      try {
        const newItem = await this.addItemToDB({
          itemName: this.state.itemName
        });
        this.props.onItemAdded(newItem);
        alert("Item name: " + this.state.itemName + " has been added.");
        this.setState({itemName: ""});
      } catch (e) {
        alert(e);
      }
    } else {
      alert("Item name cannot be empty!")
    }
  }

  // API function to add the item to the DynamoDB
  addItemToDB(item) {
    return API.post("item-manipulation-app", "/item-manipulation-app", {
      body: item
    });
  }

  render() {
    return (
      <div className="App-div">
        <div className="App-div-header">Form to add Items</div>
        <br/>
        <form className="App-flexColumn" onSubmit={this.handleSubmit}>
          <div className="App-flexRow">
            <div className="Input-div">Item Name</div>
            <div className="Input-div">
              <input type="text" 
                value={this.state.itemName} 
                onChange = {this.handleChange}/>
            </div>
          </div>
          <div className="App-submitDiv">
            <input type="submit" value="Add Item"/>
          </div>
        </form>
      </div>
      );
  }
}

// The View Item Component to view all items from the database.
class ViewItems extends React.Component {
  constructor(props) {
    super(props);
    this.generateItemList = this.generateItemList.bind(this);
  }

  // Formatting the items that are retrieved from the database as a list.
  generateItemList() {
    if(this.props.itemList){
      return this.props.itemList.map(
        (item)=> <li key={item.itemId} className="App-oneItemDiv">{item.itemName}</li>);
    }else{
      return null;
    }
  }

  render() {
    const generatedItemList = this.generateItemList();
    return(<div className="App-div">
      <div className="App-div-header">List of all Items</div>
      <br/>
      <ul>
        {generatedItemList}
      </ul>
    </div>)
  }
}

// The Main Component
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      authenticated: false,
      itemList: null
    };
    this.updateItemList = this.updateItemList.bind(this);
    this.authenticateUser();
  }

  //Authenticates user based on the data from the authConfig.js file
  async authenticateUser(){
      try {
        await Auth.signIn(authConfig.email, authConfig.password);
        this.setState({authenticated : true});
        this.getItemList();
      } catch (e) {
        // alert("Couldn't authenticate User!");
      }
  }

  //Gets the item list from the database
  async getItemList(){
    try {
      const allItems = await this.getItemsFromDB();
      if(allItems && allItems.length > 0){
        this.setState({ itemList : allItems });
      }
    } catch (e) {
      alert(e);
    }
  }

  // API function to get all items (for that user) from the DynamoDB
  getItemsFromDB(){
    return API.get("item-manipulation-app", "/item-manipulation-app");
  }

  //updates the item list in the app by adding the newly added item.
  async updateItemList(newItem){
    const newItemList = Array.from(this.state.itemList);
    newItemList.push(newItem);
    this.setState({ itemList : newItemList });
  }

  render(){
    if(!this.state.authenticated){
      return (
        <div className="App">
          <div className="App-child-1">
            Not yet authenticated.
          </div>
        </div>
      );
    }
    return(
      <div className="App">
        <div className="App-child-1">
          Logged in as {authConfig.email}.
        </div>
        <div className="App-child-2">
          <AddItem onItemAdded={this.updateItemList}/>
          <ViewItems itemList={this.state.itemList}/>
        </div>
      </div>
    );
  }
}

export default App;
