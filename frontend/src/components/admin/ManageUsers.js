import React, { Component } from 'react';
import {index ,destroy,update} from "./api"
class ManageUsers extends Component {
    state = { 
        users:[]
     }
    componentDidMount(){
        const admin = this.props.admin
        index(admin)
        .then((response) => {
        const users = response.data.users
        console.log("lala")
        this.setState({
            users:users
        })
        }).catch(error => console.log(error))
    }
    // delete = (id) => {
    //     const admin = this.props.admin
    //     destroy(admin,id)
    //     .then(() => alert("deleted"))
    //     .then(() => {
    //         const users = this.state.users.filter((user) => user._id !== id)
    //         this.setState ({users:users})
    //     })
    //     .catch((err) => console.log(err))
    // }

    // approve = (id) => {
    //     const admin = this.props.admin
    //     const isApproved = true
    //     update(admin,id,isApproved)
    //     .then(() => alert("Accepted"))
    //     .then(() => {
    //         const users = this.state.users.filter((user) => user._id !== id)
    //         this.setState ({users:users})
    //     })
    //     .catch((err) => console.log(err))
    // }
    render() { 
        return ( 
            <div>
    {this.state.users.map((user,index) => (
        <div key={index}>
        <h5>name : {user}</h5>
        <h5>email : {user.email}</h5>
    {/* <button onClick={() => this.approve(user._id)}>Accept</button>
    <button onClick={() => this.delete(user._id)}>Decline</button> */}
    </div>
    ))}
    
        </div>
         );
    }
}
 
export default ManageUsers;