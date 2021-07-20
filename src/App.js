import React, {Component} from 'react'
import Table from './Table'
import Form from './Form'

const awsURL = 'https://gxhgbd1hy0.execute-api.eu-central-1.amazonaws.com/dev/';

class App extends Component {

    removeItem = (id) => {
        this.deleteFromDB(id);
        this.getUpdatedData();
    }

    handleSubmit = (item) => {
        this.addToDB(item);
        this.getUpdatedData();
    }

    state = {
      items: [],
    }
  
    // Code is invoked after the component is mounted/inserted into the DOM tree.
    componentDidMount() {
      this.getUpdatedData();
    }

    // add an item to the database
    addToDB(item){
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId: item.itemId, name: item.name })
      };
      fetch(awsURL+'items', requestOptions)
          .then(response => response.json())
          .then(this.getUpdatedData());
    }

    // fetch all items from the DB
    getUpdatedData(){
      const url =
      awsURL+'allitems'
      fetch(url)
        .then((result) => result.json())
        .then((result) => {
          let itemsInTable = result.result.Items;
          this.setState({
            items: itemsInTable,
          })
      });
    }

    // delete an item from the DB
    deleteFromDB(itemToDelete){
      const url =
      awsURL+'deleteitem/'+itemToDelete
      fetch(url)
        .then((result) => result.json())
        .then(this.getUpdatedData())
    }

    render() {
        const { items } = this.state;
        return (
            <div className="container">
              <Form handleSubmit={this.handleSubmit} />
              <h2>Result:</h2>
              <Table itemsData={items} removeItem={this.removeItem} />
          </div>
        )
  }
}
export default App