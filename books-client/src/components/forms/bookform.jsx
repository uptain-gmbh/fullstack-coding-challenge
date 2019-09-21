import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import { saveBook } from "../../services/BookServices";

class BookForm extends Form {
  state = {
    data: {
      title: "",
      isbn: ""
    },
    errors: {}
  };

  properties = ["title", "isbn"];

  schema = {
    title: Joi.string()
      .min(1)
      .max(50)
      .required()
      .label("Title"),
    isbn: Joi.string()
      .length(5)
      .required()
      .label("ISBN")
  };

  doSubmit = async () => {
    await saveBook(this.state.data);
    this.props.history.push("/books");
  };

  render() {
    return (
      <div className="container">
        <h1>New Book</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title", "text")}
          {this.renderInput("isbn", "ISBN", "text")}
          {this.renderButton("Add")}
        </form>
      </div>
    );
  }
}

export default BookForm;
