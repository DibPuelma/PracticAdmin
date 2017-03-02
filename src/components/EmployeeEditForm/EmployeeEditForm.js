import React, { Component } from 'react'
import Dropzone from 'react-dropzone';

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
    var allSellpointsIds  = this._toIdArray(this.props.allSellpoints);
    var freeSellpointsIds = this._freeSellpoints(allSellpointsIds, []);


    if (typeof this.props.employee === 'undefined') {
      this.state = {
        status        : EmployeeEditFormStatus.READY,
        open          : true,
        employee      : employee,
        name: '',
        last_name: '',
        pictureError: 'Debes subir una imagen',
        pictureUrl: '',
        picture: null,
        SellPoints: [],
        sellpoints    : [],
        freeSellPoints: freeSellpointsIds,
        newValue      : freeSellpointsIds[0]
      }
    }
    else {
      var sellpointsIds     = this._toIdArray(employee.SellPoints);

      this.state = {
          status        : EmployeeEditFormStatus.READY,
          open          : true,
          employee      : employee,
          name          : employee.name,
          last_name     : employee.last_name,
          pictureError  : '',
          pictureUrl    : employee.picture,
          picture       : null,
          sellpoints    : sellpointsIds,
          freeSellPoints: freeSellpointsIds,
          newValue      : freeSellpointsIds[0]
        };
    }
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
              defaultValue={ this.state.name }
              onChange={ (event) => this.setState({ name: event.target.value }) }
            />
          <TextField
              floatingLabelText="Apellido:"
              fullWidth={ true }
              multiLine={ false }
              defaultValue={ this.state.last_name }
              onChange={ (event) => this.setState({ last_name: event.target.value }) }
            />
            {this._getPictureHeader()}
            {this._getPreview()}
            <Dropzone onDrop={this._onDrop} style={{width: '100%', height: '60px', marginTop: '15px', marginBottom: '15px', borderStyle: 'dotted', borderColor: '#E3E3E3'}}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Arrastra el archivo o has click para explorar (Máx 1MB)</div>
            </Dropzone>
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

  _getPictureHeader = () => {
    if(this.state.pictureError === ''){
      return (
        <div style={{color: '#b3b3b3', marginBottom: '5px', marginTop: '40px', borderBottomStyle: 'solid', borderBottomWidth: '1px', borderBottomColor: '#E3E3E3'}}>
        Foto:
        </div>
      );
    }
    return (
      [<div key='logoHeader' style={{color: '#b3b3b3', marginBottom: '5px', marginTop: '40px', borderBottomStyle: 'solid', borderBottomWidth: '1px', borderBottomColor: 'red'}}>
      Foto:
      </div>,
      <div key='pictureError' style={{color: 'red', margin: '0px', fontSize: '14px', padding: '0px'}}>
      {this.state.pictureError}
      </div>]
    );
  }

  _getPreview = () => {
    if(this.state.picture !== null){
      return (
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}} >
        <div> {this.state.picture.name} </div>
        <img src={this.state.picture.preview} style={{height: '150px', widht: '150px'}}/>
        </div>
      );
    }
    else if (this.state.pictureUrl !== ''){
      console.log(this.state.pictureUrl);
      return (
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}} >
        <img src={this.state.pictureUrl} style={{height: '150px', widht: '150px'}}/>
        </div>
      );
    }
  }

  _onDrop = (acceptedFiles, rejectedFiles) => {
    console.log('Accepted files: ', acceptedFiles);
    if(acceptedFiles.length > 1){
      this.setState({
        pictureError: 'Solo puedes subir una imagen',
        picture: null
      });
    }
    else if (rejectedFiles.length > 0){
      this.setState({
        pictureError: 'La imagen que seleccionaste no es válida',
        picture: null
      });
    }
    else if (acceptedFiles.length === 1 && acceptedFiles[0].type.split('/')[0] !== 'image'){
        this.setState({
          pictureError: 'La imagen que seleccionaste no es válida',
          picture: null
        });
    }
    else if (acceptedFiles.length === 1 && acceptedFiles[0].size > 1000000){
        this.setState({
          logoError: 'La imagen no puede tener más de 1MB',
          image: null
        });
    }
    else {
      this.setState({
        pictureError: '',
        picture: acceptedFiles[0],
        pictureUrl: ''
      });
    }
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
    var originalSellpoints = this._toIdArray(this.state.SellPoints);
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

    var data = {
      name             : this.state.name,
      last_name        : this.state.last_name,
      picture          : this.state.picture,
      newSellpoints    : newSellpoints,
      deletedSellpoints: deletedSellpoints,
      pictureUrl       : this.state.pictureUrl
    };

    this.props.onSubmit(data);
  }

}
