import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/content/create';

import styles from './styles';

export default class StoreCard extends Component {
  render() {
    return (
      <Paper style={styles.storePaper} zDepth={2}>
        <h3 style={{textAlign: 'center'}}>{this.props.sellPoint.location} </h3>
        <div style={styles.storeData}>Código: {this.props.sellPoint.code !== null ? this.props.sellPoint.code : 'No asignado'} </div>
        <div style={styles.storeData}>Encuesta para atendidos: {this.props.sellPoint.AttendedPoll !== null ? this.props.sellPoint.AttendedPoll.name : 'No asignado'} </div>
        <div style={styles.storeData}>Encuesta para no atendidos: {this.props.sellPoint.UnattendedPoll !== null ? this.props.sellPoint.UnattendedPoll.name : 'No asignado'} </div>
        <div style={styles.storeData}>Concurso actual: {this.props.sellPoint.Contest !== null ? this.props.sellPoint.Contest.name : 'No asignado'} </div>
        <div style={styles.buttonContainer}>
        <FlatButton label="Editar"
          icon={ <EditIcon /> }
          onClick={ this._showDialog }
          style={{flex: '1'}}
          />
        <FlatButton label="Eliminar"
          icon={ <DeleteIcon /> }
          style={{flex: '1'}}
          />
        </div>
       </Paper>
    );
  }
}
