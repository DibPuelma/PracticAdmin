import React, { Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';

const iconProps = {
  style: {
    marginRight: 0,
    marginTop: 4,
    marginLeft: 0
  },
  color: "#999",
  viewBox: '0 0 30 30'
};


const customContentStyle = {
  maxWidth: 700,
};

const styles = {
  loginSubmit: {
    marginRight: 20
  },
  loginInput: {
    width: '100%'
  },
  chip: {
    margin: 4
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  loginButtonsContainer: {
    paddingTop: 24,
    paddingBottom: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customWidth: {
    minWidth: 300,
    width: 350,
  }
}

var EmployeeEditFormStatus = { READY: 'ready', SAVING: 'saving' };

export default class EmployeeEditForm extends Component {
  constructor(props) {
    super(props);

    var employee = this.props.employee;
    if (this.props.employee === null) {
      employee = {
        name: '',
        last_name: '',
        picture: '',
        SellPoints: [],
        freeSellPoints: []
      }
    }

    var allSellpointsIds  = this._toIdArray(this.props.allSellpoints);
    var sellpointsIds     = this._toIdArray(employee.SellPoints);
    var freeSellpointsIds = this._freeSellpoints(allSellpointsIds, sellpointsIds);

    this.state = {
        status        : EmployeeEditFormStatus.READY,
        open          : true,
        employee      : employee,
        name          : employee.name,
        last_name     : employee.last_name,
        picture       : employee.picture,
        sellpoints    : sellpointsIds,
        freeSellPoints: freeSellpointsIds,
        newValue      : freeSellpointsIds[0]
      };
  }

  render() {
    return (
      <div className="employeeEdit">
        <Dialog
          title={ 'Editar Empleado' }
          actions={ [] }
          modal={ true }
          open={ this.state.open }
          contentStyle={ customContentStyle }
          autoScrollBodyContent={ true }
        >

        <div className="dialog">
          { /* Editable fields */ }
          <TextField
              floatingLabelText="Nombre:"
              fullWidth={ true }
              multiLine={ false }
              defaultValue={ this.state.employee.name }
              onChange={ (event) => this.setState({ name: event.target.value }) }
            />
          <TextField
              floatingLabelText="Apellido:"
              fullWidth={ true }
              multiLine={ false }
              defaultValue={ this.state.employee.last_name }
              onChange={ (event) => this.setState({ last_name: event.target.value }) }
            />
          <TextField
              floatingLabelText="Foto:"
              fullWidth={ true }
              multiLine={ false }
              defaultValue={ this.state.employee.picture }
              onChange={ (event) => this.setState({ picture: event.target.value }) }
            />
          <Divider />

          { /* Employee's sellpoints edit */}
          <div>Puntos de venta:</div>
          <div className="add-wrapper">
            <DropDownMenu
              value={ this.state.newValue }
              onChange={ (event, index, value) => this.setState({ newValue: value }) }
              style={ styles.customWidth }
              autoWidth={ true }
              >
              { this.state.freeSellPoints.map((x, i) =>
                <MenuItem value={ x } primaryText={ this._getSellPointsById(x).location } />
              )}
            </DropDownMenu>

            <FlatButton
              className="add-button"
              label="Añadir"
              icon={ <ContentAdd {...iconProps}/> }
              onClick={ this._addSellpoint }
              />
          </div>

          <p>Puntos de ventas actuales:</p>
          <div style={styles.wrapper}>
            { this.state.sellpoints.map((x, i) =>
               <Chip style={styles.chip} className="chip"
                onRequestDelete={ () => this._deleteOption(x) }>{ this._getSellPointsById(x).location }</Chip>
            )}
          </div>

          { /* Bottom bar (accept, cancel) */ }
          { this.state.status === EmployeeEditFormStatus.READY  &&
            <div style={ styles.loginButtonsContainer }>
              <RaisedButton onClick={ this._save } primary={ true } style={ styles.loginSubmit } label="Guardar" />
              <RaisedButton onClick={ this._hide } label="Cancelar" />
            </div>
          }

          { /* Bottom bar (saving) */ }
          { this.state.status === EmployeeEditFormStatus.SAVING  &&
            <div style={ styles.loginButtonsContainer }>
              <CircularProgress />
            </div>
          }
        </div>
      </Dialog>
    </div>
    );
  }

  _toIdArray = (array) => {
    var array2 = [];
    for (var i = 0; i < array.length; i++)
      array2.push(array[i].id);

    return array2;
  }

  _freeSellpoints = (all, selected) => {
    var result = [];
    for (var i = 0; i < all.length; i++) {
      if (selected.indexOf(all[i]) === -1)
        result.push(all[i]);
    }
    return result;
  }

  _getSellPointsById = (id) => {
    for (var i = 0; i < this.props.allSellpoints.length; i++) {
      if (this.props.allSellpoints[i].id === id)
        return this.props.allSellpoints[i];
    }
    return { location: '' };
  }

  _hide = () => {
    var self = this;
    this.setState({ open: false });
    new Promise(function(resolve, reject) {
      setTimeout(function() {
        self.props.onDestroy();
        resolve("Stuff worked!");
      }, 250);
    });
  }

  _addSellpoint = () => {
    var value = this.state.newValue;
    var sellpoints = this.state.sellpoints;
    var freeSellPoints = this.state.freeSellPoints;

    var index = freeSellPoints.indexOf(value);

    if (index === -1) return;

    sellpoints.push(value);
    freeSellPoints.splice(index, 1);

    this.setState({ sellpoints: sellpoints });
    this.setState({ freeSellPoints: freeSellPoints });
    if (freeSellPoints.length > 0) this.setState({ newValue: freeSellPoints[0] });
  }

  _deleteOption = (value) => {
    var sellpoints = this.state.sellpoints;
    var freeSellPoints = this.state.freeSellPoints;

    var index = sellpoints.indexOf(value);
    if (index === -1) return;

    freeSellPoints.push(value);
    sellpoints.splice(index, 1);

    this.setState({ sellpoints: sellpoints });
    this.setState({ freeSellPoints: freeSellPoints });
    if (freeSellPoints.length === 1) this.setState({ newValue: freeSellPoints[0] });
  }

  _save = () => {
    this.setState({ status: EmployeeEditFormStatus.SAVING });
    var allSellpoints      = this.props.allSellpoints;
    var allSellpointsIds   = this._toIdArray(allSellpoints);
    var originalSellpoints = this._toIdArray(this.state.employee.SellPoints);
    var selectedSellpoints = this.state.sellpoints;

    var newSellpoints     = [];
    var deletedSellpoints = [];

    for (var i = 0; i < allSellpoints.length; i++) {
      var id = allSellpointsIds[i];

      if (originalSellpoints.indexOf(id) === -1 && selectedSellpoints.indexOf(id) !== -1) {
        newSellpoints.push(id);
      } else if (originalSellpoints.indexOf(id) !== -1 && selectedSellpoints.indexOf(id) === -1) {
        deletedSellpoints.push(id);
      }
    }

    /* Request */
    // console.log(newSellpoints);
    // console.log(deletedSellpoints);

    var body = {
      name             : this.state.name,
      last_name        : this.state.last_name,
      picture          : this.state.picture,
      newSellpoints    : newSellpoints,
      deletedSellpoints: deletedSellpoints
    };

    this.props.onSubmit(body);
  }

}
