import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Navbar from "./components/bars/navbar";
import Books from "./components/books/books";
import BookForm from "./components/forms/bookform";
import NotFound from "./components/error/notfound";

function App() {
  return (
    <React.Fragment>
      <Navbar />

      <ToastContainer />
      <main className="container">
        <Switch>
          <Route path="/books/add" component={BookForm} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/books" component={Books} />
          <Route path="/" exact component={Books} />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
