import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

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
        logo: this.props.company.logo,
        image: null,
        logoError: ''
      }
    }
    else {
      this.state = {
        name: '',
        email: '',
        logo: '',
        image: null,
        logoError: ''
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
      {this._getLogoHeader()}
      {this._getPreview()}
      <Dropzone onDrop={this._onDrop} style={{width: '100%', height: '60px', marginTop: '15px', marginBottom: '15px', borderStyle: 'dotted', borderColor: '#E3E3E3'}}>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Arrastra el archivo o has click para explorar</div>
      </Dropzone>
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

  _getLogoHeader = () => {
    console.log('gettting header ', this.state.logoError);
    if(this.state.logoError === ''){
      return (
        <div style={{color: '#b3b3b3', marginBottom: '5px', marginTop: '40px', borderBottomStyle: 'solid', borderBottomWidth: '1px', borderBottomColor: '#E3E3E3'}}>
        Logo:
        </div>
      );
    }
    return (
      [<div key='logoHeader' style={{color: '#b3b3b3', marginBottom: '5px', marginTop: '40px', borderBottomStyle: 'solid', borderBottomWidth: '1px', borderBottomColor: 'red'}}>
      Logo:
      </div>,
      <div key='logoError' style={{color: 'red', margin: '0px', fontSize: '14px', padding: '0px'}}>
      {this.state.logoError}
      </div>]
    );
  }

  _getPreview = () => {
    console.log('getting preview ', this.state.image);
    if(this.state.image !== null){
      return (
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}} >
        <div> {this.state.image.name} </div>
        <img src={this.state.image.preview} style={{height: '150px', widht: '150px'}}/>
        </div>
      );
    }
  }

  _submit = () => {
    var url = '';
    var method = '';
    var message = '';
    var body = {
      name: this.state.name,
      email: this.state.email,
      logo: this.state.logo
    }
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
      body: JSON.stringify(body)
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

  _onDrop = (acceptedFiles, rejectedFiles) => {
    console.log('Accepted files: ', acceptedFiles);
    console.log('Rejected files: ', rejectedFiles);
    if(acceptedFiles.length > 1){
      this.setState({
        logoError: 'Solo puedes subir una imagen',
        preview: null
      });
    }
    else if (rejectedFiles.length > 0){
      this.setState({
        logoError: 'La imagen que seleccionaste no es válida',
        preview: null
      });
    }
    else if (acceptedFiles.length === 1 && acceptedFiles[0].type.split('/')[0] !== 'image'){
        this.setState({
          logoError: 'La imagen que seleccionaste no es válida',
          preview: null
        });
    }
    else {
      this.setState({
        logoError: '',
        image: acceptedFiles[0]
      });
    }

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
