import React, { Component } from 'react'

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import Snackbar from 'material-ui/Snackbar';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ActionDelete from 'material-ui/svg-icons/action/delete';

import styles from './styles';
import settings from '../../config/settings';
import ContestEditForm from '../ContestEditForm/ContestEditForm.js';
import dateManager from '../../lib/dateManager'

const iconProps = {
  style: {
    marginRight: 0,
    marginTop: 4,
    marginLeft: 0
  },
  color: "#999",
  viewBox: '0 0 30 30'
}
//TODO: PREMIOS SOLO EN CREATE, NO EN EDIT
export default class Contest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditDialog: false,
      editDialog: null,
      contest: this.props.contest,
      deletePressed: false,
      cantDelete: false,
      deleted: false
    };
  }

  render() {
    return (
        <Paper style={styles.container} >
        <div style={styles.informationContainer}>
          <p style={styles.title}>{this.props.contest.name} </p>
          <p style={styles.date}>
          {dateManager.getStringFromZDate(this.props.contest.draw_date)}
          </p>

          <p style={styles.sellPointsTitle}>Premios</p>
          <div style={styles.wrapper}>
            { this.props.contest.Prizes.length === 0 ?
              'Concurso sin premios' :
              this.props.contest.Prizes.map((prize, i) =>
               <Chip key={i} style={styles.chip} className="chip">{prize.name}</Chip>
            )}
          </div>

          <p style={styles.sellPointsTitle}>Puntos de venta</p>
          <div style={styles.wrapper}>
            { this.props.contest.SellPoints.length === 0 ?
              'No se han asignado puntos de venta' :
              this.props.contest.SellPoints.map((sellPoint, i) =>
               <Chip key={i} style={styles.chip} className="chip">{sellPoint.location}</Chip>
            )}
          </div>
          </div>
          <div style={styles.buttonContainer}>
          <FlatButton className="option" label="Editar"
            icon={ <ContentCreate {...iconProps}/> }
            onClick={ this._edit }
            />
          <FlatButton className="option" label="Eliminar"
            icon={ <ActionDelete {...iconProps}/> }
            onTouchTap={this._deleteConfirm}
            />
            { this.state.showEditDialog &&
              this.state.editDialog
            }
            </div>
            <Snackbar
              open={this.state.deletePressed}
              message="Para eliminar presione nuevamente el botón"
              autoHideDuration={2000}
              onRequestClose={this._handleDeletedPressedClose}
            />
            <Snackbar
              open={this.state.cantDelete}
              message="No se puede eliminar el concurso, aún está activo"
              autoHideDuration={2000}
              onRequestClose={this._handleCantDeleteClose}
            />
            <Snackbar
              open={this.state.deleted}
              message="Concurso eliminado, recargue la página para ver los cambios"
              autoHideDuration={2000}
              onRequestClose={this._handleDeletedClose}
            />
        </Paper>
    );
  }

  _handleDeletedPressedClose = () => {
    this.setState({
      deletePressed: false,
    });
  };

  _handleCantDeleteClose = () => {
    this.setState({
      cantDelete: false,
    });
  };

  _handleDeletedClose = () => {
    this.setState({
      deleted: false,
    });
  };

  _deleteConfirm = () => {
    if(new Date(this.state.contest.draw_date) > new Date(Date.now())){
      this.setState({cantDelete: true});
    }
    else {
      if(!this.state.deletePressed) {
        this.setState({deletePressed: true});
      }
      else {
        this.props.delete(this.state.contest.id);
        this.setState({deleted: true})
      }
    }
  }

  _edit = () => {
    this.setState({
      showEditDialog: true,
      editDialog:     (<ContestEditForm
                        contest={ this.props.contest }
                        onDestroy={ this._hideDialog }
                        onSubmit={ this._update }
                        sellPoints={ this.props.sellPoints }
                        takenSellPoints={this.props.takenSellPoints}
                        title='Editar Concurso'
                        />)
    });
  }

  _hideDialog = () => {
    this.setState({ showEditDialog: false, editDialog: null });
  }

  _update = (body) => {
    var company_id = 2;
    var contest_id = this.props.contest.id;

    fetch(settings.COMPANY_CONTEST.replace(":company_id", company_id).replace(":id", contest_id), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    .then((response) => response.json())
    .then((result) => {
      this._hideDialog();
      this.props.updateContests();
    })
    .catch((error) => {
      this._hideDialog();
      console.log(error);
      // TODO: show error on dialog
    });
  }
}
