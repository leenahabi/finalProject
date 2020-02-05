import React, { Component } from 'react';
import {showDriver} from "./api"
import icon from '../../images/bus-stoppp.svg'
import {withRouter} from "react-router-dom"
import EditBus from './EditBus';
class ShowBus extends Component {
    state = { 
        bus:{} 
    }
    componentDidMount(){
        const user = this.props.admin;
        const busId = this.props.id;
        showDriver(user)
        .then((response) => {
            const showBus = response.data.bus;
            this.setState({
                bus:showBus 
            })
        })
        .catch((error) => console.log(error))
    }

    updateState = (bus) => {
            this.setState({bus:bus})
    }
    render() {  
      //let img_url = (`https://maps.googleapis.com/maps/api/staticmap?center=${this.state.bus.location.latitude},${this.state.bus.location.longitude}&zoom=14&size=400x300&sensor=false&key=AIzaSyC_1OWcBHjxrGOMeeUcKpZsOrE89Kgbfuk`)
        return ( 
            <div className="main-content">
             <div>
             <div className="container">
    <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12">
            <div className="well well-sm">
                <div className="row">
                    <div className="col-sm-4 col-md-2">
                        <img src={icon} alt="" className="img-rounded img-responsive" width="100%" />
                     </div>
                    <div className="col-sm-6 col-md-8">
                    <i className="glyphicon glyphicon-envelope"><h3>{this.state.bus.bus_no}</h3></i>
                <i className="glyphicon glyphicon-envelope"><h4>{this.state.bus.status} students</h4></i>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                {/* <img src= {img_url}/> */}
            </div>
            <hr></hr>
            <EditBus id={this.state.bus._id} admin={this.props.admin} updateState={this.updateState}></EditBus>
            </div>
         );
    }
}
export default withRouter(ShowBus);