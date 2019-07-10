import React, { Component } from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Register from './components/Register'
import Media from './components/Upload'
class Body extends Component {
  render () {
    return (
    <div>
    <Route path='/register' component={Register}/>    
    <Route path='/images' component={Media}/>
    </div>
    )
  }
}

export default Body