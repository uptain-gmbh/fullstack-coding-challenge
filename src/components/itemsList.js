import React from 'react'
import Item from './item'
const ItemList = (props) => {
    let itemList = props.tasks.map((task) =>  <Item key={task.id} task={task}/>)
    console.log('item task',props)
    return ( 
        <div className='item-list container'>
           {itemList}
        </div>
        
     );
}
 
export default ItemList;