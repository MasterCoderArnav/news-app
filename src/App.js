import './App.css';

import React, { Component } from 'react';
import Navbar from './components/navbar';
import News from './components/news';

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <News pageSize = {5}/>
      </div>
    )
  }
}
