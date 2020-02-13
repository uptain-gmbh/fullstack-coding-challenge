import React, { Component } from 'react';
import UpdateForm from './updateForm'

class Item extends Component {
    constructor(props){
        super(props)
        this.state = {
            show:false
        }
    }
    toggleForm =() => {
        this.setState({show :  !this.state.show})

    }
    updateItems = (values) => {
        this.props.updateItems(this.props.task.id,values.change)
     
    }
    render() {
        return (
        <div>
        <div className='card blue-grey med-padded'>
            <span class="card-title text-container">
                {this.props.authorId == this.props.task.authorId ?(
                    <span>
                        <a className='hover-affected-button'>
                            <i class="material-icons "style={iconStyle} onClick={() => this.props.deleteItem(this.props.task.id)}>delete</i>
                        </a>
                        <a className='hover-affected-button'>
                            <i class="material-icons "style={iconStyle} onClick={this.toggleForm}>edit</i>
                        </a>
                    </span>
                ) : null}
             
                <h6 className='inline-text'>{this.props.task.item}  <span class="badge white-text">{this.props.task.author} </span> </h6>
             </span> 
        </div>
            {this.state.show ?<UpdateForm id={this.props.task.id} onSubmit={this.updateItems}/> : null}
        </div>
       
        );
    }
}


 const iconStyle = {
     verticalAlign:'middle',
     color:'red',
     opacity:'0.8',
 }
export default Item;
