import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/content/create';
import Dialog from 'material-ui/Dialog';

import StoreEditForm from '../Forms/StoreEditForm';

import styles from './styles';
import settings from '../../config/settings';

export default class StoreCard extends Component {

  constructor(props){
    super(props);
    this.state = {
      editOpen: false,
      alertOpen: false
    }
  }

  _handleEditOpen = () => {
    this.setState({editOpen: true});
  };

  _handleEditClose = () => {
    this.setState({editOpen: false});
  };

  _handleAlertOpen = () => {
    this.setState({alertOpen: true});
  };

  _handleAlertClose = () => {
    this.setState({alertOpen: false});
  };

  render() {
    const alertActions = [
      <FlatButton
        label="Sí"
        primary={true}
        onTouchTap={this._delete}
      />,
      <FlatButton
        label="No"
        primary={true}
        onTouchTap={this._handleAlertClose}
      />
    ];
    return (
      <Paper style={styles.storePaper} zDepth={2}>
        <h3 style={{textAlign: 'center'}}>{this.props.sellPoint.location} </h3>
        <div style={styles.storeData}>Código: {this.props.sellPoint.code !== null ? this.props.sellPoint.code : 'No asignado'} </div>
        <div style={styles.storeData}>Encuesta para atendidos: {this.props.sellPoint.AttendedPoll !== null ? this.props.sellPoint.AttendedPoll.name : 'No asignado'} </div>
        <div style={styles.storeData}>Encuesta para no atendidos: {this.props.sellPoint.UnattendedPoll !== null ? this.props.sellPoint.UnattendedPoll.name : 'No asignado'} </div>
        <div style={styles.storeData}>Concurso actual: {this.props.sellPoint.Contest !== null ? this.props.sellPoint.Contest.name : 'No asignado'} </div>
        <div style={styles.buttonContainer}>
        <FlatButton label="Editar"
          icon={<EditIcon />}
          onTouchTap={this._handleEditOpen}
          style={{flex: '1'}}
          />
        <FlatButton label="Eliminar"
          icon={<DeleteIcon />}
          style={{flex: '1'}}
          onTouchTap={this._handleAlertOpen}
          />
        </div>
        <Dialog
            title="Edición de local"
            modal={false}
            open={this.state.editOpen}
            onRequestClose={this._handleEditClose}
            autoScrollBodyContent={true}
          >
            <StoreEditForm sellPoint={this.props.sellPoint}
            company={this.props.company}
            handleClose={this._handleEditClose}
            />
          </Dialog>
          <Dialog
            modal={false}
            actions={alertActions}
            open={this.state.alertOpen}
            onRequestClose={this._handleAlertClose}
          >
            Estás seguro que quieres eliminar esta compañía?
          </Dialog>
       </Paper>
    );
  }

  _delete = () => {
    var url = settings.STORE.replace(':company_id', this.props.company.id).replace(':sell_point_id', this.props.sellPoint.id)
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      this.setState({alertOpen: false});
    })
    .catch((error) => {
      console.log(error);
    })
  }
}
