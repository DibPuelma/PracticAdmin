import React, { Component } from 'react'
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Link to="/entrar"><RaisedButton>Entrar</RaisedButton></Link>
        <Link to="/descargas"><RaisedButton>Descargas</RaisedButton></Link>

        <h2>Home</h2>
      </div>
    );
  }
}
