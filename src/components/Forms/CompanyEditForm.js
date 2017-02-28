import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';

import settings from '../../config/settings';

export default class CompanyEditForm extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.company);
    if (this.props.company) {
      this.state = {
        name: this.props.company.name,
        email: this.props.company.email,
        logo: this.props.company.logo
      }
    }
    else {
      this.state = {
        name: '',
        email: '',
        logo: ''
      }
    }
  }

  render() {
    return (
      <div>
      <TextField
      floatingLabelText="Nombre: "
      fullWidth={ true }
      multiLine={true}
      value={ this.state.name }
      onChange={this._changeName}
      />
      <TextField
      floatingLabelText="Email: "
      fullWidth={ true }
      multiLine={true}
      value={ this.state.email }
      onChange={this._changeEmail}
      />
      <TextField
      floatingLabelText="Logo: "
      fullWidth={ true }
      multiLine={true}
      value={ this.state.logo }
      onChange={this._changeLogo}
      />
      <div>
      <FlatButton
        label="Cancelar"
        primary={true}
        onTouchTap={this.props.handleClose}
      />
      <FlatButton
        label="Aceptar"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this._submit}
      />
      </div>
      </div>
    );
  }

  _submit = () => {
    var url = '';
    var method = '';
    var message = '';
    if (this.props.company){
      url = settings.COMPANY.replace(':id', this.props.company.id);
      method = 'PUT';
      message = 'Compañía Modificada';

    }
    else {
      url = settings.COMPANIES;
      method = 'POST';
      message = 'Compañía Creada';

    }
    fetch(url, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state)
    })
    .then((response) => response.json())
    .then((result) => {
      this.props.handleSnackbarOpen(message);
      this.props.handleClose();
      this.props.reload();
    })
    .catch((error) => {
      this.props.handleSnackbarOpen('Hubo un error, algún campo está malo');
      console.log(error);
    })
  }

  _changeName = (event) => {
    this.setState({name: event.target.value})
  }

  _changeEmail = (event) => {
    this.setState({email: event.target.value})
  }

  _changeLogo = (event) => {
    this.setState({logo: event.target.value})
  }
}
