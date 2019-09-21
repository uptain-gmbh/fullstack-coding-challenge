import React, { Component } from "react";

class TableBody extends Component {
  returnComponent = element => {
    const newComponent = this.props.dataComponent(element);
    return newComponent;
  };
  render() {
    const { data } = this.props;
    return (
      <tbody>
        {data.map(element => (
          <tr key={element.id}>{this.returnComponent(element)}</tr>
        ))}
      </tbody>
    );
  }
}
export default TableBody;
