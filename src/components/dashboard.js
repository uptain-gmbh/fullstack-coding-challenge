import React from 'react'
import '../styles/dashboard.css'
const Dashboard = (props) => {
    return ( 
        <div className='dashboard'>
            <h5>{props.users.user.firstName}  {props.users.user.lastName}</h5>
        </div>
     );
}
 
export default Dashboard;