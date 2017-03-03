import React, { Component } from 'react'

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';

import ActionViewHeadline from 'material-ui/svg-icons/action/view-headline'
import ContentCreate from 'material-ui/svg-icons/content/create';
import ActionDelete from 'material-ui/svg-icons/action/delete';

import PollDialog from '../../components/PollDialog/PollDialog.js';
import settings from '../../config/settings';


const iconProps = {
  style: {
    marginRight: 0,
    marginTop: 4,
    marginLeft: 0
  },
  color: "#999",
  viewBox: '0 0 30 30'
}
export default class Poll extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      showDialog: false, 
      dialog    : false, 
      poll      : this.props.poll,
    };
  }

  render() {
    return (
      <div className="poll-container">
        <Paper className="poll" >
          <div className="title">{ this.state.poll.name }</div>
          <div className="description">{ this.state.poll.description }</div>
          <Divider />
          <FlatButton className="option" label="Ver" 
            icon={ <ActionViewHeadline {...iconProps}/> } 
            onClick={ () => this.props.doShow(this.state.poll.id) }
            />
          <FlatButton className="option" label="Editar" 
            icon={ <ContentCreate {...iconProps}/> }
            onClick={ this._showDialog }
            />
          <FlatButton className="option" label="Eliminar" 
            icon={ <ActionDelete {...iconProps}/> } 
            onClick={ () => this.props.doDelete(this.state.poll.id) }
            />
        </Paper>
        
        { this.state.showDialog && 
          this.state.dialog
        }

      </div>
    );
  }

  _showDialog = () => {
    this.setState({ showDialog: true, 
      dialog: (<PollDialog 
                onDestroy={ this._hideDialog } 
                onSubmit={ this._updatePoll }
                user={ this.props.user }
                poll={ this.props.poll } 
                editingMode={ true }
                />)
    });
  }

  _hideDialog = () => {
    this.setState({ showDialog: false, dialog: null });
  }

  _updatePoll = (body) => {
    var self = this;

    var poll_id = this.state.poll.id;
    var company_id = this.props.user.company_id;
    var url = settings.COMPANY_POLL.replace(":company_id", company_id);
    url = url.replace(":poll_id", poll_id);

    // Update poll info
    var request = fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      'body': JSON.stringify(body)
    })
    .then((response) => response.json());

    request.then(function(result) {
      self._hideDialog();
      self.props.display("Encuesta modificada con éxito");
      self.props.onUpdate();
    }, function(err) {
      self.props.display("Error interno. Consultar al administrador.");
      console.log(err);
    });

  }

}
