import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import io from "socket.io-client";

import ScreenNavigation from './screens/ScreenNavigation';

class App extends Component {
  constructor() {
    super();
    this.state = {

    };
    
    this.socket = io('http://127.0.0.1:1212', {jsonp : false});
    this.socket.on('connect', () => {
      console.log('CONNECTION SUCCESSFUL');
      });
      
    
  }

  componentDidMount() {
    
  }
  render(){
      return <ScreenNavigation socket={this.socket}/>



    /*
    return <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    */
  };


}

export default App;
