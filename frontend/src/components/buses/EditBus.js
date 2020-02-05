import React, { Component } from 'react';
import {update,showDriver ,updateStudent} from "./api"
import {withRouter} from "react-router-dom"
import { Marker ,Map,GoogleApiWrapper } from 'google-maps-react';
import { Button } from 'react-bootstrap';
//  import {marker,Map, GoogleApiWrapper } from 'google-map-react'
//import location from '@derhuerst/browser-location'
class EditBus extends Component {
    state = { 
        data:{  
            bus:{
          
            status:"",//pickup = false , dropOff = true 
            students:[],
            location:  { 
                latitude:"",
                longitude: ""
               }
                     },
              studentId:''}
   }
   componentDidMount(){ // show bus info 
   
        const user = this.props.admin
        const busId = this.props.id 
         showDriver(user)
        .then((res)=>{
            const bus = res.data.bus
            this.setState(({...copyState}) => {
                copyState.data.bus = bus
                return copyState
            })
        })
        .catch((err)=>console.log("err"))
         this.getLocation()
    }
    getLocation = () => {
        console.log("inside getlocation")
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(this.showPosition,this.showError);
        } else {
            //
        } 
    }
     showPosition =(position) => {
        const loc = { 
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }
        this.setState(({...copyState}) => {
            copyState.data.bus.location = loc
            return copyState
        })
        // const copyBus = {...this.state.data.bus}
        // copyBus.location = loc
        // this.setState({   
        //     bus:copyBus
        // }
        // )
    }
    showError  = (error) => {
        return "error"
    }
    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
         const newForm = Object.assign(this.state.data.bus)
         newForm[name] = value;
         this.setState({...this.state,
           bus:newForm
        })
  
    }
    handleChangeStudent = (event) => {

        const value = event.target.value;
         this.setState(({...copyState}) => {
            copyState.data.studentId = value
            return copyState
        })

    }

    // getLocation() {
    //     if (navigator.geolocation) {
    //       navigator.geolocation.getCurrentPosition(showPosition);
    //     } else {
    //     console.log( "Geolocation is not supported by this browser.")
    //     }
    //   }
    //   showPosition() {
    //     console.log( `"Latitude: ${this.props.coords.latitude} 
    //     "Longitude:   ${this.props.coords.longitude}`)
    //   }
        // showPosition(position) {
            //   let latlon = position.coords.latitude + "," + position.coords.longitude;
            //     var img_url = `https://maps.googleapis.com/maps/api/staticmap?center=
            //     "+latlon+"&zoom=14&size=400x300&sensor=false&key=AIzaSyC_1OWcBHjxrGOMeeUcKpZsOrE89Kgbfuk`;
            //  getLocation() {
            //     if (navigator.geolocation) {
            //       navigator.geolocation.getCurrentPosition(showPosition);
            //     } else {
            //     console.log( "Geolocation is not supported by this browser.")
            //     }
            //   }
            //   showPosition() {
            //     console.log( `"Latitude: ${this.props.coords.latitude} 
            //     "Longitude:   ${this.props.coords.longitude}`)
            //   }
        //}


    handleSubmit = (event) => {
        event.preventDefault();
          const user = this.props.admin
          const busId = this.props.id;
          const updateBus = this.state.data.bus;
          const updateData = this.state.data
          console.log("................",user,updateData,busId)
          //update(user,updateData,busId)
          updateStudent(user,updateData,busId)
         .then(() => this.sendData())
         
         .then(() => alert('updated'))
         .then(() => this.props.history.push(`/buses/driver`)) // redirect bus Id pade
         .catch((error) => console.log(error))
    }
    sendData = () => {
        this.props.updateState(this.state.data.bus);
   }
    render() { 
     
        const mapStyles = {
            width: '40%',
            height: '40%',
          };
        return ( 
            <div className="edit-bus">
               <form onSubmit={this.handleSubmit}>
        <label>Bus Number:{this.state.data.bus.bus_no}</label>  <br/>  
             <label>status:
              <label>
              <input type="radio" value="DropOff" name= "status"
                       checked={this.state.data.bus.status === 'DropOff'} 
                      onChange={this.handleChange} />   
                      DropOff</label>
                      <label>
               <input type="radio" value="PickUp" name= "status"
                       checked={this.state.data.bus.status === 'PickUp'} 
                      onChange={this.handleChange} /> PickUp </label>  
                    </label> <br/> 
          <Button variant="outline-info" type="submit">Update</Button>
         
          <div >
                     <div >
                         {/* onChange={this.handleChangeBus} */}
                    <select name="bus" onChange={this.handleChangeStudent} >
                        <option>Select Student</option>
                    {this.state.data.bus.students.map((student,index) => (
                    <option key={index} value={student._id}>{student.name}</option>))}
                    </select>
          </div>
                                    </div>
                                    <br/>
                                    <div id="map-container-google-2" className="z-depth-1-half map-container row" style={{height: "500px"}}>
          {/* <Map
                google={this.props.google}
                zoom={16}
                style={mapStyles}
                initialCenter={{ lat: this.state.data.bus.location.latitude, lng: this.state.data.bus.location.longitude}}
            >
                <Marker position={{ lat: this.state.data.bus.location.latitude, lng: this.state.data.bus.location.longitude}} />
            </Map> */}
             {this.state.data.bus.location.latitude ? (
                                            <div id="map-container-google-2" className="z-depth-1-half map-container row" style={{height: "500px"}}>
                                            <Map style={{borderColor:"blue"}}
                                            google={this.props.google}
                                            zoom={10}
                                            style={mapStyles}
                                            initialCenter={{ lat: this.state.data.bus.location.latitude, lng: this.state.data.bus.location.longitude}}
                                        >
                                            <Marker position={{ lat: this.state.data.bus.location.latitude, lng: this.state.data.bus.location.longitude}} />
                                        </Map>
                                        </div>
                                        
                                        ) : null}
            <br/>
            </div>
            <br/>
            </form>
        </div>
         );
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyD9eo_qfsgmA2pYn8EQnM1ij24xzfOKtQQ'
  })(withRouter(EditBus));