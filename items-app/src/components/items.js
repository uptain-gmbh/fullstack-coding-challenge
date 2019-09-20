 import React from 'react'
  const Items = ({ items }) => {
    return (
      <div>
        <center><h1>Items List</h1></center>
        {items.map((item) => (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Title: {item.title}</h5>
              <p className="card-text">Description: {item.description}</p>
            </div>
          </div>
        ))}
      </div>
    )
  };
  export default Items;