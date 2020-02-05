import React, { Component } from 'react';
import {create} from "./api"
import {show} from "./api.js"
import {showBuses} from "./api.js"
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'



class StudentAdd extends Component {
    state = { 
       
        buses: [],
        data:{
                student:{
                    name:'',
                    date: '',
                    address:{ latitude: "21.422510",
                    longitude: "39.826168"}},
                bus:{
                    }
            }
        
     }
 componentDidMount(){
     const user = this.props.user 

     showBuses(user)
    .then(res => {
        // console.log(res)
        const allbuses = res.data.buses
        //let copy = [...this.state.buses]
        //copy=allbuses
        this.setState({...this.state,
            buses:allbuses
        })
    }).catch((error) => console.log(error))
    }
 
    handleChangeStudent = event => {
       const name = event.target.name
       const value = event.target.value
       const newForm = Object.assign(this.state.data.student)
       newForm[name] = value;
        this.setState ({...this.state,
           student:newForm})
    }
    handleChangeBus = event => {
       const value = event.target.value
       console.log(value);
        this.setState( ({...copyState})=>{
            copyState.data.bus = value
            return copyState
        });
     }
 

   Addstudent =  event => {
    event.preventDefault()
    create(this.props.user,this.state.data)
    .then(
        res => {
            console.log(res)
        
        }
    )
    .then(() => alert('StudentAdded'))
    .catch(
        err=> console.log(err)
    )
    

}
    render() { 
        console.log(this.state.data.bus)
        return ( 
            <div className='main-content'>
            <form  onSubmit={this.Addstudent}>
             {/* {this.state.buses.map((bus,index) => {<div key={index}>{bus}</div>})} */}
            <h3>Add student</h3>
            
            <input
              required
              name="name"
              value={this.state.data.student.name}
              placeholder="Name"
              onChange={this.handleChangeStudent}
            />
             <div >
             <select name="bus" onChange={this.handleChangeBus} >
                 {this.state.buses.map((bus,index) => (
                    
                    <option key={index} value={bus._id}>{bus.bus_no}</option>
                    
       
    ))} 
    </select>
                                    </div>
           
            <Button variant="outline-info" type="submit">Add</Button>
          </form>
             <Link to="/students">All Students</Link> 
             </div>
         );
    }
}
 
export default StudentAdd;