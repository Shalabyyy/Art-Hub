import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Body from './Body';
import 'materialize-css'

function App() {
  return (
    <div>
     <h1> Hello There</h1>
     <Router>
       <Body></Body>
     </Router>
    </div>
  );
}

export default App;
