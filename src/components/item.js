import React from 'react'
const Item = ({task}) => {
    console.log('item props', task.item)
    return ( 
            <div className='card blue-grey med-padded'>
                <span class="card-title text-container"><h6>{task.item}  <span class="badge white-text">{task.author} </span></h6> </span> 
            </div>
     );
}
 
export default Item;