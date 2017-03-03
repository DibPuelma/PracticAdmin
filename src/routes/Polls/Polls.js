import React, { Component } from 'react'

import FullPageLoading from '../../components/FullPageLoading/FullPageLoading.js';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import Poll from '../../components/Poll/Poll.js';
import PollDialog from '../../components/PollDialog/PollDialog.js';
import PollShow from '../../components/PollShow/PollShow.js';
import ContentAdd from 'material-ui/svg-icons/content/add';

import settings from '../../config/settings';

var PollsStatus = { LOADING: 'loading', READY: 'ready' };

const iconProps = {
  style: {
    marginRight: 0,
    marginTop: 4,
    marginLeft: 10
  },
  color: "#FFF",
  viewBox: '0 0 30 30'
}

export default class Polls extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      status          : PollsStatus.LOADING,
      showCreateDialog: false, 
      createDialog    : null,
      user            : this.props.route.getUser(),
      deleteDialogOpen: false,
      snackOpen       : false,
      snackText       : ''
    };
  }

  componentDidMount() {
    this._load();
  }

  render() {
    const actions = [
      <FlatButton label="Cancelar" primary={true} onTouchTap={this._handleClose} />,
      <FlatButton label="Eliminar" primary={true} onTouchTap={this._deleteRequest} />,
    ];

    return (
      <div>
        { this.state.status === PollsStatus.LOADING &&
          <FullPageLoading />
        }

        { this.state.status !== PollsStatus.LOADING &&
          <div>
            <div>
              <RaisedButton onClick={ this._create } primary={ true } label="Crear" icon={ <ContentAdd {...iconProps}/> } />
            </div>

            <div className="polls-container">
              { this.state.polls.map((x) => (
                <Poll 
                  poll={ x } 
                  user={ this.state.user } 
                  key={ x.id } 
                  doShow={ this._show } 
                  doDelete={ this._delete }
                  onUpdate={ this._load }
                  display={ this._display }
                  />
              ))}
            </div>

            { this.state.showCreateDialog && 
              this.state.createDialog
            }

            <Dialog
              actions={ actions }
              modal={ false }
              open={ this.state.deleteDialogOpen }
              onRequestClose={ this._handleClose }
              >
              Esta acción es irreversible. ¿Continuar?
            </Dialog>
          </div>
        }

        <Snackbar
          open={ this.state.snackOpen }
          message={ this.state.snackText }
          autoHideDuration={ 4000 }
          onRequestClose={ () => { this.setState({ snackOpen: false }) } }
          />


      </div>
    );
  }

  _display = (msg) => {
    this.setState({ snackText: msg, snackOpen: true });
  }

  _load = () => {
    this.setState({ status: PollsStatus.LOADING });
    var polls = this;

    var company_id = this.state.user.company_id;
    var url = settings.COMPANY_POLLS.replace(":id", company_id);
    var promise = fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json());

    promise.then(function(result) {
      polls.setState({ polls: result });
      polls.setState({ status: PollsStatus.READY });
    }, function(err) {
      console.log(err);
    });
  }


  _hideDialog = () => {
    this.setState({ showCreateDialog: false, createDialog: null });
  }

  _create = () => {
    this.setState({ 
      showCreateDialog: true, 
      createDialog:     (<PollDialog 
                          onDestroy={ this._hideDialog }
                          onSubmit={ this._createSubmit }
                          user={ this.state.user }
                          />)
    });
  }

  _show = (id) => {
    this.setState({
      showCreateDialog: true, 
      createDialog:     (<PollShow
                          pollId={ id }
                          onDestroy={ this._hideDialog }
                          user={ this.state.user }
                          />)
    })
  }

  _createSubmit = (body) => {
    var self = this;
    var company_id = this.state.user.company_id;
    var url = settings.COMPANY_POLLS.replace(":id", company_id);

    var promise = fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify(body)
    })
    .then((response) => response.json());

    promise.then(function(result) {
      self._hideDialog();
      self._display("Encuesta creada con éxito");
      self._load();
      //console.log(result);
    }, function(err) {
      self._display("Error interno. Consultar al administrador.");
      self._hideDialog();
      console.log(err);
      // TODO: show error on dialog
    });
  }

  _handleClose = () => {
    this.setState({ deleteDialogOpen: false });
  };

  _delete = (id) => {
    this.setState({ toDelete: id, deleteDialogOpen: true });
  }

  _deleteRequest = () => {
    this.setState({ deleteDialogOpen: false });
    this.setState({ status: PollsStatus.LOADING });

    var self = this;
    var company_id = this.state.user.company_id;
    var url = settings.COMPANY_POLL.replace(":company_id", company_id);
    url = url.replace(":poll_id", this.state.toDelete);
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(function(result) {
      self._display("Encuesta eliminada con éxito");
      self._load();
    }, function(err) {
      self._display("Error interno. Consultar al administrador.");
      self._load();
      console.log(err);
    });
  }
}
