import React from 'react'
import Item from './item'
const ItemList = (props) => {
    let itemList = props.tasks.map((task) =>  <Item key={task.id} task={task} authorId={task.authorId} deleteItem={props.deleteItem} updateItems={props.updateItems} authorId={props.user.user.user_id}/>)
    return ( 
        <div className='item-list container'>
           {itemList}
        </div>
        
     );
}
 
export default ItemList;