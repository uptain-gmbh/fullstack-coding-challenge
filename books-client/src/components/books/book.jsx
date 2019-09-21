import React, { Component } from "react";
class Book extends Component {
  render() {
    const { id, title, isbn } = this.props.book;
    return (
      <React.Fragment>
        <td>{id}</td>
        <td>{title}</td>
        <td>{isbn}</td>
      </React.Fragment>
    );
  }
}

export default Book;
