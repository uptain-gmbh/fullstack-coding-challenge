
import firebase from "firebase"
import db from '../../firebase/config'
import { loaded, addError, removeError, loading, addItem, getItems } from './actionCreators'
export const addItems = (item, user) => (dispatch) => {
    dispatch({ type: removeError })
    dispatch({ type: loading })
    let newitem = {
        item: item,
        author: user.user.firstName + user.user.lastName,
        id: item + user.user.firstName + user.user.lastName
    }
    let ref = db.collection("items").doc(item)
    return ref.set(newitem).then(() => dispatch({ type: loaded, newitem }))
        .then(() => dispatch({ type: addItem, newitem }))
        .then(() => dispatch({ type: loaded }))
        .catch((error) => dispatch({ type: addError, error }))


}

export const fetchItems = () => (dispatch) => {
    dispatch({ type: removeError })
    dispatch({ type: loading })
    return db.collection("items").get()
        .then((items) => items.docs.map(item => item.data()))
        .then((tasks) => {
            console.log('tasks', tasks)
            return dispatch({ type: getItems, tasks })
        })
        .then(() => dispatch({ type: loaded }))
        .catch((error) => dispatch({ type: addError, error }))


}