import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import settings from '../../config/settings';

export default class ManagerEditForm extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.manager);
    if (this.props.manager) {
      this.state = {
        firstName: this.props.manager.first_name,
        lastName: this.props.manager.last_name,
        password: '',
        passwordConfirm: '',
        email: this.props.manager.email,
        firstNameError: '',
        lastNameError: '',
        passwordError: 'La contraseña debe tener al menos 4 caractéres',
        emailError: ''
      }
    }
    else {
      this.state = {
        firstName: '',
        lastName: '',
        password: '',
        passwordConfirm: '',
        email: '',
        firstNameError: 'El campo no puede estar vacío',
        lastNameError: 'El campo no puede estar vacío',
        passwordError: 'La contraseña debe tener al menos 4 caractéres',
        emailError: 'Por favor ingrese un email válido'
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
        value={ this.state.firstName }
        onChange={this._changeFirstName}
        errorText={this.state.firstNameError}
        />
        <TextField
        floatingLabelText="Apellido: "
        fullWidth={ true }
        multiLine={true}
        value={ this.state.lastName }
        onChange={this._changeLastName}
        errorText={this.state.lastNameError}
        />
        <TextField
        floatingLabelText="Contraseña: "
        fullWidth={ true }
        multiLine={true}
        value={ this.state.password }
        onChange={this._changePassword}
        errorText={this.state.passwordError}
        />
        <TextField
        floatingLabelText="Confirmar Contraseña: "
        fullWidth={ true }
        multiLine={true}
        value={ this.state.passwordConfirm }
        onChange={this._changePasswordConfirm}
        errorText={this.state.passwordError}
        />
        <TextField
        floatingLabelText="Email: "
        fullWidth={ true }
        multiLine={true}
        value={ this.state.email }
        onChange={this._changeEmail}
        errorText={this.state.emailError}
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

  _allValid = () => {
    return this.state.firstNameError === '' && this.state.lastNameError === '' && this.state.emailError === '' && this.state.passwordError === '';
  }

  _submit = () => {
    var url = '';
    var method = '';
    var message = '';
    if(!this._allValid()){
      this.props.handleSnackbarOpen('Aún hay errores en el formulario');
      return;
    }
    var body = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      password: this.state.password,
      password_confirm: this.state.passwordConfirm,
      email: this.state.email,
      company_id: this.props.company.id
    }
    console.log(body);
    if (this.props.manager){
      url = settings.MANAGER.replace(':manager_id', this.props.manager.id);
      method = 'PUT';
      message = 'Manager Modificado';
    }
    else {
      url = settings.MANAGERS;
      method = 'POST';
      message = 'Manager Creado';
    }
    fetch(url, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      this.props.handleSnackbarOpen(message);
      this.props.handleClose();
      this.props.reload();
    })
    .catch((error) => {
      this.props.handleSnackbarOpen('Hubo un error en el servidor, intente nuevamente');
      console.log(error);
    })
  }

  _changeFirstName = (event) => {
    if(event.target.value !== ''){
      this.setState({
        firstName: event.target.value,
        firstNameError: ''
      })
    }
    else {
      this.setState({
        firstName: event.target.value,
        firstNameError: 'El campo no puede estar vacío'
      })
    }
  }

  _changeLastName = (event) => {
    if(event.target.value !== ''){
      this.setState({
        lastName: event.target.value,
        lastNameError: ''
      })
    }
    else {
      this.setState({
        lastName: event.target.value,
        lastNameError: 'El campo no puede estar vacío'
      })
    }
  }

  _changePassword = (event) => {
    if(event.target.value === this.state.passwordConfirm){
      this.setState({
        password: event.target.value,
        passwordError: ''
      })
    }
    else if (event.target.value.length < 4) {
      this.setState({
        password: event.target.value,
        passwordError: 'La contraseña debe tener al menos 4 caractéres'
      })
    }
    else {
      this.setState({
        password: event.target.value,
        passwordError: 'Las contraseñas no coinciden'
      })
    }  }

  _changePasswordConfirm = (event) => {
    if(event.target.value === this.state.password){
      this.setState({
        passwordConfirm: event.target.value,
        passwordError: ''
      })
    }
    else {
      this.setState({
        passwordConfirm: event.target.value,
        passwordError: 'Las contraseñas no coinciden'
      })
    }
  }

  //TODO: validar email
  _changeEmail = (event) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(event.target.value)){
      this.setState({
        email: event.target.value,
        emailError: ''
      })
    }
    else {
      this.setState({
        email: event.target.value,
        emailError: 'Por favor ingrese un email válido'
      })
    }
  }


}
