import React, { Component } from 'react'
import {browserHistory} from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
import './../../index.css';

import settings from '../../config/settings';

const customContentStyle = {
  maxWidth: '360px',
};

const styles = {
  loginSubmit: {
    marginRight: 20
  },
  loginInput: {
    width: '100%'
  },
  loginButtonsContainer: {
    paddingTop: 24,
    paddingBottom: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}

var LoginStatus = { WAITING: 'waiting', LOGGING_IN: 'logging_in' }

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = { displayLogin: false, status: LoginStatus.WAITING };
  }

  render() {
    return (
      <div className="home-container">
        <div className="top-bar">
          <FlatButton label="Entrar" onClick={ this._showLoginModal } />
        </div>

        <h2>Practiweb</h2>

        { /* Login Dialog */ }
        <Dialog
          title="Entrar"
          actions={ [] }
          modal={ true }
          open={ this.state.displayLogin }
          contentStyle={customContentStyle}
        >
          Ingresa como administrador<br />
          <TextField 
            hintText="Correo" 
            style={ styles.loginInput }
            onChange={ (event) => this.setState({ email: event.target.value}) }
            />

          <br />

          <TextField 
            hintText="Contraseña" 
            type="password" 
            style={ styles.loginInput }
            onChange={ (event) => this.setState({ password: event.target.value}) }
            />

          <br />

          { this.state.error &&
            <div>{ this.state.error }</div>
          }

          { this.state.status === LoginStatus.WAITING &&
            <div style={ styles.loginButtonsContainer }>
              <RaisedButton primary={ true } style={ styles.loginSubmit } label="Entrar" onClick={ this._login } />
              <RaisedButton onClick={ this._hideLoginModal } label="Cancelar" />
            </div>
          }

          { this.state.status === LoginStatus.LOGGING_IN &&
            <div style={ styles.loginButtonsContainer }>
              <CircularProgress />
            </div>
          }

        </Dialog>
      </div>
    );
  }

  _showLoginModal = () => {
    this.setState({ displayLogin: true });
  };

  _hideLoginModal = () => {
    this.setState({ displayLogin: false });
  };

  _login = () => {
    this.setState({ status: LoginStatus.LOGGING_IN });

    var body = { email: this.state.email , password: this.state.password };

    var self = this;
    var url = settings.MANAGER_LOGIN;

    var promise = fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify(body)
    })
    .then((response) => response.json());

    promise.then(function(result) {
      switch(result.code) {
        case 'OK':
          console.log("logged in");
          self.props.route.onLogin(result.manager);
          browserHistory.push('/dashboard');
          return;
        case 'WRONG_PASSWORD':
          self.setState({ error: 'Contraseña incorrecta' });
          self.setState({ status: LoginStatus.WAITING });
          return;
        case 'MANAGER_DOES_NOT_EXIT':
          self.setState({ error: 'El usuario no existe' });
          self.setState({ status: LoginStatus.WAITING });
          return;
      }
      self.setState({ error: 'Error interno' });
      self.setState({ status: LoginStatus.WAITING });
    }, function(err) {
      console.log(err);
    });

  }

}
