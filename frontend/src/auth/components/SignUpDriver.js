import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
//import family from "../images/mother.svg"
import driver from "../../images/bus copy.svg"
import { Button } from 'react-bootstrap';
import { signUpDriver, signIn} from '../api'
import messages from '../messages'

class SignUpDriver extends Component {
  constructor () {
    super()

    this.state = {
      name:'',
      email: '',
      password: '',
      passwordConfirmation: '',
      number:''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    signUpDriver(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      .then(() => alert(messages.signUpSuccess, 'success'))
      .then(() => history.push('/buses/new'))
      .catch(error => {
        console.error(error)
        this.setState({ name:"",email: '', password: '', passwordConfirmation: '',number:'' })
        alert(messages.signUpFailure, 'danger')
      })
  }

  render () {
    const { name, email, password, passwordConfirmation , number} = this.state
     //console.log(this.state.driver)
    return (
      <form className='auth-form' onSubmit={this.onSignUp}>
         <div className="center">
        <img src={driver} height="200px" width="200px"></img>
        <br/>
        <h3>Sign Up</h3>
        </div>
        <label htmlFor="name">Name</label>
        <input
          required
          name="name"
          value={name}
          type="name"
          placeholder="Name"
          className="form-control"
          onChange={this.handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          required
          name="email"
          value={email}
          type="email"
          placeholder="Email"
          className="form-control"
          onChange={this.handleChange}
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
        <label htmlFor="passwordConfirmation">Confirm Password</label>
        <input
          required
          name="passwordConfirmation"
          value={passwordConfirmation}
          type="password"
          placeholder="Confirm Password"
          className="form-control"
          onChange={this.handleChange}
        />
        <label htmlFor="number">Contact Number</label>
        <input
          required
          name="number"
          value={number}
          placeholder="(555)-555-5555"
          type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          className="form-control"
          onChange={this.handleChange}
        />
        
        <Button variant="outline-info" type="submit">Sign Up</Button>
      </form>
    )
  }
}

export default withRouter(SignUpDriver)
