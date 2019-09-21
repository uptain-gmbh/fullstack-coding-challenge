import React, { Component } from "react";
import Table from "../common/table";
import Book from "./book";
import { getBooks } from "../../services/BookServices";
class Books extends Component {
  state = {
    books: [],
    fields: [
      { field_name: "ID", data_name: "id" },
      { field_name: "Title", data_name: "title" },
      { field_name: "ISBN", data_name: "isbn" }
    ]
  };

  async componentDidMount() {
    const books = await getBooks();
    this.setState({ books });
  }

  renderStatement = () => {
    const { books } = this.state;
    if (books.length === 0) return <h3>There is no book in the database.</h3>;
    return <h4>Showing {books.length} books.</h4>;
  };

  dataComponent = book => {
    return <Book key={book.id} book={book} />;
  };

  render() {
    const { books } = this.state;
    return (
      <React.Fragment>
        {this.renderStatement()}
        <Table
          fields={this.state.fields}
          data={books}
          dataComponent={this.dataComponent}
        />
      </React.Fragment>
    );
  }
}

export default Books;
