import React, { Component } from "react";
import "font-awesome/css/font-awesome.css";

export default class TableHeaders extends Component {
  render() {
    const { fields } = this.props;
    return (
      <thead>
        <tr>
          {fields.map(field => (
            <th key={field.field_name}>
              <span>{field.field_name}</span>
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}
