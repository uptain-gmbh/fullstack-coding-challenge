import React from 'react';
import logo from './logo.svg';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import HomePage from './views/HomePage'
import AuthForm from './views/AuthForm'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' component={AuthForm}></Route>
      <Route exact path='/home' component={HomePage}></Route>
    </BrowserRouter>
   
  );
}

export default App;
