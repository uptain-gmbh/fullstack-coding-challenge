
import firebase from "firebase"
import db from '../../firebase/config'
import {loaded, addError,removeError, loading, addItem, getItems, deleteItem, updateItem} from './actionCreators'
export const addItems = (item,user) => (dispatch) => {
    dispatch({type:removeError})
    dispatch({type:loading})
    let newItem = {
        item:item,
        authorId:user.user.user_id,
        author:user.user.firstName + user.user.lastName,
        id:item + user.user.firstName + user.user.lastName
    }
    console.log(user,newItem)
    let ref = db.collection("items").doc(newItem.id)
    return ref.set(newItem).then(() => dispatch({type:loaded,newItem}))
    .then(() => dispatch({type:addItem,newItem}))
    .then(() => dispatch({type:loaded}))
    .catch((error) => dispatch({type:addError,error}))
 

}

export const fetchItems = () => (dispatch) => {
    dispatch({type:removeError})
    dispatch({type:loading})
    return  db.collection("items").get()
        .then((items) => items.docs.map(item => item.data()))
        .then((tasks) => {
            return dispatch({type:getItems,tasks})
        })
        .then(() => dispatch({type:loaded}))
        .catch((error) => dispatch({type:addError,error}))
 

}

export const deleteItems = (id) => (dispatch) => {
    console.log('deleting',id)
    dispatch({type:removeError})
    dispatch({type:loading})
    return  db.collection("items").doc(id).delete()
        .then((tasks) => {
            return dispatch({type:deleteItem,id})
        })
        .then(() => dispatch({type:loaded}))
        .catch((error) => dispatch({type:addError,error}))
 

}
export const updateItems = (id,item) => (dispatch) => {
    console.log('updating',id,item)
    dispatch({type:removeError})
    dispatch({type:loading})

    return  db.collection("items").doc(id).update({
        item:item,
    })
    .then(() => {
        console.log('updated task')
        return dispatch({type:updateItem,item,id})
    })
    .then(() => dispatch({type:loaded}))
    .catch((error) => dispatch({type:addError,error}))
 

}
