import React, { Component } from 'react'
import family from "../images/mother.svg"
import driver from "../images/bus copy.svg"
//import family from "../images/airballoons.jpg"
//import driver from "../images/busphoto.jpg"
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

class Register extends Component {

state = {
}
  
   
  render () {
    
    return (
            <div className="register">
           <div className="intro-img"> <Link to='/sign-up'><img src={family} height="370px"  width="370px"></img></Link><h3>Guardian</h3></div>
           <div className="intro-img"><Link to='/sign-up/driver'><img src={driver} height="370px"  width="370px"></img></Link><h3>Driver</h3></div>
           {/* <div className="intro-img"> <Link to='/sign-up'><img src={family} height="450px" width="450px" style={{borderRadius:"400px"}}></img></Link></div>
           <div className="intro-img"><Link to='/sign-up/driver'><img src={driver} height="450px" width="450px" style={{borderRadius:"400px"}}></img></Link> </div>
            */}
            </div>
    )
  }
}

export default withRouter(Register)
