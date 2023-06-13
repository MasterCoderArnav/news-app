import './App.css';

import React, { Component } from 'react';
import Navbar from './components/navbar';
import News from './components/news';

export default class App extends Component {
  n = "John";
  render() {
    return (
      <div>
        <Navbar />
        <News/>
      </div>
    )
  }
}

//Api-key = 4d26820f6418423a92b1dfbafbb7bdd2
