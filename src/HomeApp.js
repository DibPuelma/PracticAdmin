import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class HomeApp extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div>Homepage:</div>
          <div>{this.props.children}</div>
        </div>
      </MuiThemeProvider>
    );
  }
}
