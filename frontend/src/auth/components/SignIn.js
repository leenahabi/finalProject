import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { signIn } from '../api'
//import family from "../images/mother.svg"
import driver from "../../images/bus-pin.svg"
import messages from '../messages'

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      driver:false
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault() 
    const { alert, history, setUser } = this.props
    console.log(this.props)
    signIn(this.state)
      .then(res => {
        setUser(res.data.user)
        console.log(res.data.user)

        this.setState({driver:res.data.user.driver})
      
      if (this.state.driver) 
      { console.log(res.data)
        history.push(`/buses/driver`) } 
      else
      //{history.push('/buses/')}
      {history.push('/students')}
      })
      .then(() => alert(messages.signInSuccess, 'success'))
      .then(() => {
        // if (this.state.driver) 
        // { 
        //   history.push(`/buses/`) } 
        // else
        //   {history.push('/students')}
        })
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '' })
        alert(messages.signInFailure, 'danger')
      })
  }

  render () {
    const {email,password} = this.state

    return (
      <form className='auth-form' onSubmit={this.onSignIn}>
         <div className="center">
        <img src={driver} height="170px" width="170px"></img>
        <br/>
        <h3>Sign In</h3>
        </div>
        <label htmlFor="email">Email</label>
        <input
          required
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={this.handleChange}
          className="form-control"
        />
        <label htmlFor="password">Password</label>
        <input
          required
          name="password"
          value={password}
          type="password"
          placeholder="Password"
          className="form-control"
          onChange={this.handleChange}
        />
        <Button variant="outline-info" type="submit">Sign In</Button>
      </form>
    )
  }
}

export default withRouter(SignIn)
