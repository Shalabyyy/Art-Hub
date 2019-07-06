import React, { Component } from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Register from './components/Register'
class Body extends Component {
  render () {
    return (
    <div>
    <Route path='/register' component={Register}/>    
    </div>
    )
  }
}

export default Body