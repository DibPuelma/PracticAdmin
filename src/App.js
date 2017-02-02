import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  handleClick(e) {
    e.preventDefault();
    console.log("A button!");
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Practiweb</h2>
          </div>
          <h1>Hello world!</h1>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <RaisedButton onClick={this.handleClick}>A button!</RaisedButton>
          <br />
          <TextField hintText="An input"/>

          <div>
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
