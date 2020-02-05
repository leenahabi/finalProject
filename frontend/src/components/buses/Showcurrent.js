import React, { Component } from 'react';
import {show} from "./api"
import icon from '../../images/bus-stoppp.svg'
import {withRouter} from "react-router-dom"
import { Marker ,Map,GoogleApiWrapper } from 'google-maps-react';

class ShowCurrent extends Component {
    state = { 
        bus:{
            status:"",
            students:[],
             location:{
                    latitude:"",
                    longitude:""
             },
             updatedAt:""
        } 
    }
    componentWillMount(){
        const user = this.props.admin;
        const busId = this.props.match.params.busId;
        console.log(user,busId)
        show(user,busId)
        .then((response) => {
            const showBus = response.data.bus;
            console.log(showBus)
            this.setState({
                bus:showBus 
            })
            console.log(this.state.bus)
        })
        .catch((error) => console.log(error))
    }

    render() {  
        // const user = this.props.admin;
        // const busId = this.props.match.params.busId;
        // console.log(busId)
        // show(user,busId)
        // .then((response) => {
        //     const showBus = response.data.bus;
        //     this.setState({
        //         bus:showBus 
        //     })
        // })
        // .catch((error) => console.log(error))
        console.log(this.state.bus)
        const mapStyles = {
            width: '90%',
            height: '100%',
          };        
      //let img_url = (`https://maps.googleapis.com/maps/api/staticmap?center=${this.state.bus.location.latitude},${this.state.bus.location.longitude}&zoom=14&size=400x300&sensor=false&key=AIzaSyC_1OWcBHjxrGOMeeUcKpZsOrE89Kgbfuk`)
        return ( 
        <div className="main-content" >
            
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12">
                            <div className="well well-sm">
                                <div className="row">
                                    <div className="col-sm-4 col-md-2">
                                        <img src={icon} alt="" class="img-rounded img-responsive" width="100%" />
                                    </div>
                                    <div className="col-sm-6 col-md-8">
                                        <i className="glyphicon glyphicon-envelope"><h3>{this.state.bus.bus_no}</h3></i>
                                        <i className="glyphicon glyphicon-envelope"><h4>{this.state.bus.status} students</h4></i>
                                        <i className="glyphicon glyphicon-envelope"><h4>{this.state.bus.updatedAt} </h4></i>
                                    </div>
                                </div>
                            </div>
                            <hr></hr>
                            <div>
                 {this.state.bus.students.map((student,index) => (
                 <span key={index} >{student.name}</span>))}    
       </div>
       <hr></hr>
                             {this.state.bus.location.latitude ? (
                                            <div id="map-container-google-2" className="z-depth-1-half map-container row" style={{height: "500px"}}>
                                            <Map style={{borderColor:"blue"}}
                                            google={this.props.google}
                                            zoom={10}
                                            style={mapStyles}
                                            initialCenter={{ lat: this.state.bus.location.latitude, lng: this.state.bus.location.longitude}}
                                        >
                                            <Marker position={{ lat: this.state.bus.location.latitude, lng: this.state.bus.location.longitude}} />
                                        </Map>
                                        </div>
                                        
                                        ) : null}


                        </div>
                    </div>
                
                {/* {this.state.bus.location.latitude ? (
                <div >
                <Map style={{borderColor:"blue"}}
                google={this.props.google}
                zoom={10}
                style={mapStyles}
                initialCenter={{ lat: this.state.bus.location.latitude, lng: this.state.bus.location.longitude}}
            >
                <Marker position={{ lat: this.state.bus.location.latitude, lng: this.state.bus.location.longitude}} />
            </Map>
            </div>
            ) : null} */}
                {/* <img src= {img_url}/> */}
                </div> 
            </div>
        </div>
         );
    }
}








export default GoogleApiWrapper({
apiKey: 'AIzaSyD9eo_qfsgmA2pYn8EQnM1ij24xzfOKtQQ'
  })(withRouter(ShowCurrent));