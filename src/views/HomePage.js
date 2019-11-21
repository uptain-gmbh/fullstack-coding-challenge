import React, { Component } from 'react';
import Preloader from '../components/preloader'
import {connect} from 'react-redux'
import ItemsFormAndList from '../components/itemFormAndList'
import Dashboard from '../components/dashboard'
import {addItems,fetchItems} from '../store/actions/items'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
class Homepage extends Component {
    componentDidMount(){
        this.props.user.user ? this.props.fetchItems() : this.props.history.push("/")
        
    }
    submitItem = (values) => {
        this.props.addItems(values.item,this.props.user)
        .then(() =>  {
            if(this.props.errors.error){
                 toast.error(this.props.tasks.error.message)
     }})
    }
    render() {
        console.log('prop',this.props)
        return (
            <div>
                 {this.props.loading.loading? <div className='container page-centered'>
                <Preloader/>
                </div> : null
                }
                <ToastContainer />
                <Dashboard users={this.props.user}  />
                <ItemsFormAndList  submitItem={this.submitItem} items = {this.props.items} user={this.props.users} />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    addItems: (addedItems,users) => dispatch(addItems(addedItems,users)),
    fetchItems: () => dispatch(fetchItems())

})
const mapStateToProps = (state) => {
return {
    user:state.user,
    errors:state.errors,
    loading:state.loading,
    form:state.form,
    items:state.items
}
}
export default connect(mapStateToProps,mapDispatchToProps)(Homepage)