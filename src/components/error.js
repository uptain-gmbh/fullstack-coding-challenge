import React, {Component} from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Error = ({error}) => {
    if(error){
        toast.error(error.message)
    }
    return (  <ToastContainer /> );
}
 
export default Error;