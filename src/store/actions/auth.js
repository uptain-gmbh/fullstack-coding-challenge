import firebase from "firebase"
import db from '../../firebase/config'
import {signedIn, signedUp, loaded, addError,removeError, loading} from './actionCreators'
export const signup = (email,password,firstName,lastName) => (dispatch) => {
    dispatch({type:removeError})
    dispatch({type:loading})
    let newUser = {
        email,password,firstName,lastName
    }
    
    //firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).createUserWithEmailAndPassword(email, password)
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(cred =>{
            let ref =db.collection('users').doc(cred.user.uid)
            ref.set({
                ...newUser, user_id : cred.user.uid
            }).then(() => dispatch({type:signedUp, newUser}))
            .then(() => dispatch({type:loaded}))
         })
         .catch((error) => {
            dispatch({type:loaded})
            return dispatch({type:addError,error})
        })

}

export const signin = (email,password) => (dispatch) => {
    dispatch({type:removeError})
    dispatch({type:loading})
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(cred =>{
        let user = firebase.auth().currentUser
        db.collection("users").where("user_id", "==", user.uid).get()
        .then(snapshot => snapshot.docs[0].data())
        .then((user) => dispatch({type:signedIn,user}))
         })
         .then(() => dispatch({type:loaded}))
         .catch((error) => {
            dispatch({type:loaded})
            return dispatch({type:addError,error})})

}