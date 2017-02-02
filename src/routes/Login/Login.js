import React, { Component } from 'react'
import { Link } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class Login extends Component {
  render() {
    return (
      <div>
        <Link to="/"><RaisedButton>Inicio</RaisedButton></Link>
        <h2>Login</h2>
        <TextField hintText="Usuario"/><br />
        <TextField hintText="Contraseña"/><br />
        <RaisedButton>Entrar</RaisedButton>
      </div>
    );
  }
}
