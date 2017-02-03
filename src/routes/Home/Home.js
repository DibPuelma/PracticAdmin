import React, { Component } from 'react'
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
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
    'align-items': 'center',
    'justify-content': 'center',
  }
}

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = { displayLogin: false };
  }

  handleOpen = () => {
    this.setState({ displayLogin: true });
  };

  handleClose = () => {
    this.setState({ displayLogin: false });
  };

  render() {
    return (
      <div>
        <Link to="/entrar"><RaisedButton label="Entrar" /></Link>
        <h2>Home</h2>

        <div>
          <RaisedButton label="Modal Dialog" onClick={ this.handleOpen } />
          <Dialog
            title="Entrar"
            actions={ [] }
            modal={ true }
            open={ this.state.displayLogin }
            contentStyle={customContentStyle}
          >
            Ingresa como administrador<br />
            <TextField hintText="Usuario" style={ styles.loginInput }/><br />
            <TextField hintText="Contraseña" style={ styles.loginInput }/><br />
            <div style={ styles.loginButtonsContainer }>
              <RaisedButton primary={ true } style={ styles.loginSubmit }label="Entrar" />
              <RaisedButton onClick={ this.handleClose } label="Cancelar" />
            </div>
          </Dialog>
        </div>
      </div>
    );
  }
}



