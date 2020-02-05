import React, { Component } from 'react';
import {create} from "./api"
import driver from "../../images/school-bus (1).svg"
import {withRouter} from "react-router-dom"
import { Button } from 'react-bootstrap';

class CreateBus extends Component {
    state = {
      bus:{
        bus_no: 0,
        status: "" ,//pickup = false , dropOff = true 
        location:  { latitude:"",
                    longitude: ""
             }
          }
        }
    
    
    handleChange = (event) => {
      // //get the name of input
      const name = event.target.name;
      // // get the value of input
      const value = event.target.value;
       const newForm = {...this.state.bus}
       newForm[name] = value;
      this.setState({
          bus:newForm
      })
  }

  handleSubmit = (event) => {
      event.preventDefault();
      const newBus = this.state.bus
      const user = this.props.admin
      let id 
      //console.log(newBus,user)
      create(user,newBus)

      .then((res) => {
       // console.log(res.data.bus._id)
       id = res.data.bus._id
        //id = res.data.bus._id
        alert('Bus Added')
      })
      //const id = res.data.bus._id
      //.then(history.push('/bus'))
       //.then((res) => this.props.history.push(`/bus/${res.id}`))
      .then(() => this.props.history.push(`/buses/driver`))
      .catch((error) => console.log(error))
  }

    
    
    render () {
      return(
        <div  className='auth-form'>
          <div className="center">
          <img src={driver} height="200px" width="200px"></img>
          <h3>Add a Bus</h3>
          <form onSubmit={this.handleSubmit} >
            <div className="form-inline">
              <div className="form-group">
          <label>Bus no :&nbsp;</label>
              <input className="form-control mx-sm-3" onChange={this.handleChange} type="number" placeholder="Bus Number"name="bus_no" value={this.state.bus.bus_no}/>
              </div>
              </div>
              <Button variant="outline-info" type="submit">Add</Button>
          </form>
          </div>
          </div>
      )
  }


}
export default withRouter(CreateBus);