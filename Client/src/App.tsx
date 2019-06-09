import React, { Component } from 'react';
import { getListRoute } from './utils/apiRoutes';

class App extends Component {

  public render() {

    async function callUptainServer() {
      try {
        const response = await fetch(getListRoute()).then((res) => res.json());
        console.log('Uptain Server responce: ' + response);
      } catch (err) {
        console.log(err);
      }
    }

    callUptainServer();

    return (
      <div>
        <p>Firaaas Hamila</p>
      </div>
    );
  }

}

export default App;
