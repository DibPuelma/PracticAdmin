import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/content/create';
import Dialog from 'material-ui/Dialog';

import ManagerEditForm from '../Forms/ManagerEditForm';

import styles from './styles';
import dateManager from '../../lib/dateManager';
import settings from '../../config/settings';

export default class ManagerCard extends Component {
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

  render(){
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
    return(
      <Paper style={styles.managerPaper} zDepth={2}>
      <div style={styles.titlesContainer}>
      <h3 style={styles.title}> {this.props.manager.first_name} {this.props.manager.last_name} </h3>
      <div style={styles.subtitle}> {this.props.manager.email} </div>
      </div>
      <Divider/>
      <div style={styles.managerData}> Última conexión </div>
      <div style={styles.managerData}> {dateManager.getHumanSpanishString(this.props.manager.updated_at)} </div>
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
          title="Edición de manager"
          modal={false}
          open={this.state.editOpen}
          onRequestClose={this._handleEditClose}
          autoScrollBodyContent={true}
        >
          <ManagerEditForm reload={this.props.reload} handleSnackbarOpen={this.props.handleSnackbarOpen}
          manager= {this.props.manager}
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
          Estás seguro que quieres eliminar este manager?
        </Dialog>
      </Paper>
    );
  }

  _delete = () => {
    var url = settings.MANAGER.replace(':manager_id', this.props.manager.id)
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
      this.setState({alertOpen: false}, () => {
        this.props.handleSnackbarOpen('Manager eliminado');
        this.props.reload();
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }
}
