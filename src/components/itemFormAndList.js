import React from 'react'
import ItemForm from './itemForm'
import ItemsList from './itemsList'
import '../styles/itemFormAndList.css'
const ItemFormAndList = (props) => {
    console.log('itemprops',props)
    return ( 
        <div className='item-form-and-list'>
            <div className='item-form verticaly-spaced'>
                <ItemForm item={props.item} onSubmit={props.submitItem}/>
            </div>
            <div className='item-list verticaly-spaced'>
                <ItemsList tasks = {props.items.tasks}/>    
            </div>
            
            
        </div>
        
     );
}
 
export default ItemFormAndList;