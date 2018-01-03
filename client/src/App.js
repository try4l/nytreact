import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Main from "./components/Main";


const App = () =>
  <Router>
    <div>
      <Route path="/" component={Main} />
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  </Router>;


export default App;
