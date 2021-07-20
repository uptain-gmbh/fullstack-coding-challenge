import React from 'react'

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th></th>
      </tr>
    </thead>
  )
}

const TableBody = (props) => {
    const rows = props.itemsData.map((row, index) => {
      return (
        <tr key={index}>
        <td>{row.itemId}</td>
        <td>{row.name}</td>
        <td>
            <button onClick={() => props.removeItem(row.itemId)}>Delete</button>
        </td>
        </tr>
      )
    })
  
    return <tbody>{rows}</tbody>
  }

const Table = (props) => {
    const {itemsData, removeItem} = props
  
    return (
      <table>
        <TableHeader />
        <TableBody itemsData={itemsData} removeItem={removeItem} />
      </table>
    )
}

export default Table