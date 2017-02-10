import React, { Component } from 'react'
import {browserHistory} from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
import './../../index.css';

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
          <TextField hintText="Usuario" style={ styles.loginInput }/><br />
          <TextField hintText="Contraseña" type="password" style={ styles.loginInput } /><br />
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

    //var home = this;
    var promise = new Promise(function(resolve, reject) {
      setTimeout(function() { // Wait for api simulation
        resolve("Stuff worked!");
        //reject(Error("It broke"));
      }, 2000);
    });

    promise.then(function(result) {
      console.log(result);
      browserHistory.push('/dashboard');
    }, function(err) {
      console.log(err);
    });

  }

}
