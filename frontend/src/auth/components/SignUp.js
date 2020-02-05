import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { signUp, signIn } from '../api'
import family from "../../images/mother.svg"
//import driver from "../images/bus copy.svg"
import messages from '../messages'

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      name:'',
      email: '',
      password: '',
      passwordConfirmation: '',
      number:'',
      driver:false
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props
      signUp(this.state) 
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      .then(() => alert(messages.signUpSuccess, 'success'))
      .then(() => history.push('/students'))
      .catch(error => {
        console.error(error)
        this.setState({ name:"",email: '', password: '', passwordConfirmation: '',number:''})
        alert(messages.signUpFailure, 'danger')
      })
  }

  render () {
    const { name, email, password, passwordConfirmation , number} = this.state
     //console.log(this.state.driver)
    return (

      <form className='auth-form' onSubmit={this.onSignUp}>
        <div className="center">
        <img src={family} height="200px" width="200px"></img>
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
          onChange={this.handleChange}
          className="form-control"
        />
        <label htmlFor="email">Email</label>
        <input
          required
          name="email"
          value={email}
          type="email"
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
          onChange={this.handleChange}
          className="form-control"
        />
        <label htmlFor="passwordConfirmation">Confirm Password</label>
        <input
          required
          name="passwordConfirmation"
          value={passwordConfirmation}
          type="password"
          placeholder="Confirm Password"
          onChange={this.handleChange}
          className="form-control"
        />
        <label htmlFor="number">Contact Number</label>
        <input
          required
          name="number"
          value={number}
          placeholder="(555)-555-5555"
          type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          onChange={this.handleChange}
          className="form-control"
        />
        <Button variant="outline-info" type="submit">Sign Up</Button>
      </form>
    )
  }
}

export default withRouter(SignUp)
