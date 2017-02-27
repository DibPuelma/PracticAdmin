import React, { Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';

import dateManager from '../../lib/dateManager';

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

var ContestEditFormStatus = { READY: 'ready', SAVING: 'saving' };

export default class ContestEditForm extends Component {
  constructor(props) {
    super(props);

    var contest = this.props.contest;
    if (this.props.contest === null) {
      contest = {
        name: '',
        draw_date: dateManager.getString(new Date(Date.now())),
        SellPoints: [],
        freeSellPoints: []
      }
    }

    // var currentPrizesIds = this._toIdArray(this.props.contest.Prizes);
    var sellPointsIds  = this._toIdArray(this.props.sellPoints);
    var sellpointsIds     = this._toIdArray(contest.SellPoints);
    var freeSellpointsIds = this._freeSellpoints(sellPointsIds, sellpointsIds);

    this.state = {
      status           : ContestEditFormStatus.READY,
      open             : true,
      alertOpen        : false,
      alertDialog      : false,
      contest          : contest,
      name             : contest.name,
      draw_date        : contest.draw_date,
      sellpoints       : sellpointsIds,
      freeSellPoints   : freeSellpointsIds,
      newValue         : freeSellpointsIds[0],
      prizeName        : '',
      prizeDescription : '',
      prizes           : []
    };
  }

  render() {
    const actions = [
      <FlatButton
      label="Sí"
      primary={true}
      onTouchTap={this._save}
      />,
      <FlatButton
      label="No"
      primary={true}
      onTouchTap={this.handleAlertClose}
      />,
    ];
    return (
      <div className="contestEdit">
      <Dialog
      title={ this.props.title }
      actions={ [] }
      modal={ false }
      open={ this.state.open }
      contentStyle={ customContentStyle }
      autoScrollBodyContent={ true }
      onRequestClose={this._hide}
      >
      <div className="dialog">
      { /* Editable fields */ }
      <TextField
      floatingLabelText="Nombre:"
      fullWidth={ true }
      multiLine={ false }
      defaultValue={ this.state.contest.name }
      onChange={ (event) => this.setState({ name: event.target.value }) }
      />
      <DatePicker
      onChange={this._handleChangeDate}
      floatingLabelText="Fecha de sorteo"
      defaultDate={new Date(this.state.draw_date)}
      formatDate={new Intl.DateTimeFormat('es-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format}
      DateTimeFormat={Intl.DateTimeFormat}
      locale='es-US'
      minDate={new Date(Date.now())}
      />

      <div>Añadir Premios: </div>
      <div className="add-wrapper">
      <TextField
      floatingLabelText="Nombre:"
      fullWidth={ true }
      multiLine={ false }
      value={ this.state.prizeName }
      onChange={ (event) => this.setState({ prizeName: event.target.value }) }
      />
      <TextField
      floatingLabelText="Descripción:"
      fullWidth={ true }
      multiLine={ true }
      value={ this.state.prizeDescription }
      onChange={ (event) => this.setState({ prizeDescription: event.target.value }) }
      />
      <FlatButton
      className="add-button"
      label="Añadir"
      onClick={ this._addPrize }
      />
      </div>

      <p>Premios actuales:</p>
      <div style={styles.wrapper}>
      { this.state.prizes.map((prize, i) =>
        <Chip key={i + 'p'} style={styles.chip} className="chip"
        onRequestDelete={ () => this._deletePrize(prize) }>
        {prize.name}
        </Chip>
      )}
      </div>

      <Divider />

      { /* Contest's sellpoints edit */}
      <div>Puntos de venta:</div>
      <div className="add-wrapper">
      <DropDownMenu
      value={ this.state.newValue }
      onChange={this._handleDropDown}
      style={ styles.customWidth }
      autoWidth={ true }
      >
      { this.state.freeSellPoints.map((freeSellPoint, i) =>
        <MenuItem key={i + 'fsp'} value={ freeSellPoint } primaryText={ this._getSellPointsById(freeSellPoint).location } />
      )}
      </DropDownMenu>

      </div>

      <p>Puntos de venta actuales:</p>
      <div style={styles.wrapper}>
      { this.state.sellpoints.map((sellPoint, i) =>
        <Chip key={i + 'sp'} style={styles.chip} className="chip"
        onRequestDelete={ () => this._deleteOption(sellPoint) }>{ this._getSellPointsById(sellPoint).location }</Chip>
      )}
      </div>

      { /* Bottom bar (accept, cancel) */ }
      { this.state.status === ContestEditFormStatus.READY  &&
        <div style={ styles.loginButtonsContainer }>
        <RaisedButton onClick={ this._confirmSave } primary={ true } style={ styles.loginSubmit } label="Guardar" />
        <RaisedButton onClick={ this._hide } label="Cancelar" />
        </div>
      }

      { /* Bottom bar (saving) */ }
      { this.state.status === ContestEditFormStatus.SAVING  &&
        <div style={ styles.loginButtonsContainer }>
        <CircularProgress />
        </div>
      }
      </div>
      <Dialog
      actions={actions}
      modal={false}
      open={this.state.alertOpen}
      onRequestClose={this.handleAlertClose}
      >
      Algunos de los locales seleccionados ya tienen un concurso activo, está seguro que desea realizar el cambio?
      </Dialog>
      </Dialog>
      </div>
    );
  }

  handleAlertOpen = () => {
    this.setState({alertOpen: true});
  };

  handleAlertClose = () => {
    this.setState({alertOpen: false});
  };

  _handleDropDown = (event, index, value) => {
    this.setState({ newValue: value }, () => {
      this._addSellpoint();
    });
  }

  _handleChangeDate = (event, date) => {
    this.setState({draw_date: date});
  };
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
    for (var i = 0; i < this.props.sellPoints.length; i++) {
      if (this.props.sellPoints[i].id === id)
      return this.props.sellPoints[i];
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

    this.setState({
      sellpoints: sellpoints,
      freeSellPoints: freeSellPoints
    });
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

  _addPrize = () => {
    var newPrize = {
      name: this.state.prizeName,
      description: this.state.prizeDescription
    }
    this.setState({
      prizeName: '',
      prizeDescription: '',
      prizes: this.state.prizes.concat([newPrize])
    })
  }

  _deletePrize = (value) => {
    var index = this.state.prizes.indexOf(value);
    this.setState((prevState) => ({
      prizes: [...prevState.prizes.slice(0,index), ...prevState.prizes.slice(index+1)]
    }))
  }

  _confirmSave = () => {
    var idsSet = new Set(this._toIdArray(this.props.sellPoints))
    var takenFlag = false;
    this.props.takenSellPoints.map((taken) => {
      if(idsSet.has(taken)) {
        this.handleAlertOpen();
        takenFlag = true;
      }
    })
    if(takenFlag)
    return;
    this._save();
  }

  _save = () => {
    this.setState({ status: ContestEditFormStatus.SAVING });
    var sellPoints      = this.props.sellPoints;
    var sellPointsIds   = this._toIdArray(sellPoints);
    var originalSellpoints = this._toIdArray(this.state.contest.SellPoints);
    var selectedSellpoints = this.state.sellpoints;

    var newSellpoints     = [];
    var deletedSellpoints = [];

    for (var i = 0; i < sellPoints.length; i++) {
      var id = sellPointsIds[i];

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
      name              : this.state.name,
      draw_date         : this.state.draw_date,
      newSellpoints     : newSellpoints,
      deletedSellpoints : deletedSellpoints,
      newPrizes         : this.state.prizes
    };
    console.log(body);
    this.props.onSubmit(body);
  }

}
