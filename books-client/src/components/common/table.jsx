import React, { Component } from "react";
import TableHeaders from "./theaders";
import TableBody from "./tbody";

class Table extends Component {
  render() {
    const { fields, data, dataComponent } = this.props;
    return (
      <table className="table">
        <TableHeaders fields={fields} />
        <TableBody data={data} dataComponent={dataComponent} />
      </table>
    );
  }
}

export default Table;
