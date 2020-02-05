import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'
import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignUpDriver from './auth/components/SignUpDriver'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import AlertDismissible from './auth/components/AlertDismissible'
import Register from './components/Register'
import ManageUsers from './components/admin/ManageUsers'
import CreateBus from './components/buses/CreateBus'
import EditBus from './components/buses/EditBus'
import ShowBus from './components/buses/ShowBus'
import ShowCurrent from './components/buses/Showcurrent'
import Index from './components/buses/Index'
import Student from './components/student/Student'
import StudentAdd from './components/student/StudentAdd'
import StudentShow from './components/student/StudentShow'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: [],
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AlertDismissible key={index} variant={alert.type} message={alert.message} />
        ))}
        <main className="container">
          <Route path='/sign-up/driver' exact render={() => (
            <SignUpDriver alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-up/' exact render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route exact path='/' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />

            <AuthenticatedRoute user={user} exact path='/buses/new' render={() => (
            <CreateBus admin={user} />
            )} />
                <AuthenticatedRoute user={user} exact path="/students" render={() => (
                <Student user={user}></Student>
              )}/> 
       <AuthenticatedRoute user={user} exact path="/students/add" render={() => (
                <StudentAdd user={user}></StudentAdd>
              )}/> 
     <AuthenticatedRoute user={user} exact path="/students/:studentId/show" render={() => (
                <StudentShow user={user}></StudentShow >
              )}/> 
             <AuthenticatedRoute user={user} exact path="/buses/driver" render={()=>(
            <ShowBus admin={user} ></ShowBus>
          )}/>
          <AuthenticatedRoute user={user} exact path="/bus/:busId" render={()=>(
            <ShowCurrent admin={user} ></ShowCurrent>
          )}/>
         <AuthenticatedRoute user={user} exact path='/buses/' exact render={()=>(
            <Index admin={user}/>
          )}/>
        <AuthenticatedRoute user={user} excat path="/buses/edit" render={() => (
          <EditBus admin={user} id={this.state.bus._id}></EditBus>)}/>
          {/* <AuthenticatedRoute user={user} excat path="/buses/:busId/show" render={(props)=>(
            <ShowU admin={user} busId={props.match.params.id}></ShowU>
          )}/> */}

        </main>
        <Route admin={user} path="/register" exact render={() => (
          <Register admin={user}></Register>)}/>
         </React.Fragment>
        
    )
  }
}

export default App
