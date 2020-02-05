import React, { Component } from 'react';
import {index ,destroy} from "./api"
import { Link } from 'react-router-dom'
class BusIndex extends Component {
    state = { 
        buses:[]
     }
    componentDidMount(){
        const admin = this.props.admin
        index(admin)
        .then((response) => {
        const buses = response.data.buses
        this.setState({
            buses:buses
        })
        }).catch(error => console.log(error))
    }
    delete = (id) => {
        const admin = this.props.admin
        destroy(admin,id)
        .then(() => alert("deleted"))
        .then(() => {
            const buses = this.state.buses.filter((bus) => bus._id !== id)
            this.setState ({buses:buses})
        })
        .catch((err) => console.log(err))
    }

    render() { 
        return ( 
            <div className="main-content">
            <h2>Availble Buses</h2> 
            
         {this.state.buses.map((bus,index) => (
        <div key={index}>
           {console.log(bus)}
        <h5>Bus Number : {bus.bus_no}</h5>
        <Link to={`/bus/${bus._id}/`}>View</Link>
        <hr></hr>
    {/* <button onClick={() => this.delete(bus._id)}>Delete</button> */}
    </div>
    ))}
    
        </div>
         );
    }
}
 
export default BusIndex;