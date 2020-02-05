import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <Link to="/change-password">Change Password</Link>
    <Link to="/sign-out">Sign Out</Link>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Link to="/register">Sign Up</Link>
    <Link to="/">Sign In</Link>
  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>
    <Link to="/buses/">Buses</Link>
  </React.Fragment>
)

const Header = ({ user }) => (
  <header className="main-header">
    <h1>Keep me Safe&nbsp;</h1><img src="https://www.animatedimages.org/data/media/425/animated-bus-image-0001.gif" border="0" alt="animated-bus-image-0001" />
    <nav>
      { user && <span>Welcome, {user.name}</span>}
      { user ? authenticatedOptions : unauthenticatedOptions }
      { alwaysOptions }
      
    </nav>
  </header>
)

export default Header
