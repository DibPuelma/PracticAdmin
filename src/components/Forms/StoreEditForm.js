import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import settings from '../../config/settings';

export default class StoreEditForm extends Component {
  constructor(props) {
    super(props);
    if (this.props.sellPoint) {
      this.state = {
        location: this.props.sellPoint.location,
        code: this.props.sellPoint.code
      }
    }
    else {
      this.state = {
        location: '',
        code: ''
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
        value={ this.state.location }
        onChange={this._changeLocation}
        />
        <TextField
        floatingLabelText="Código: "
        fullWidth={ true }
        multiLine={true}
        value={ this.state.code }
        onChange={this._changeCode}
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
    if (this.props.sellPoint){
      url = settings.STORE.replace(':company_id', this.props.sellPoint.company_id).replace(':sell_point_id', this.props.sellPoint.id);
      method = 'PUT';
    }
    else {
      url = settings.STORES.replace(':company_id', this.props.company.id)
      method = 'POST'
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
      //HACER RELOAD DE LOS DATOS
      this.props.handleClose();
    })
    .catch((error) => {
      console.log(error);
    })
  }

  _changeLocation = (event) => {
    this.setState({location: event.target.value})
  }

  _changeCode = (event) => {
    this.setState({code: event.target.value})
  }

}
