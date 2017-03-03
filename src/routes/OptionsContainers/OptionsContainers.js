import React, { Component } from 'react'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import ContentAdd from 'material-ui/svg-icons/content/add';

import FullPageLoading from '../../components/FullPageLoading/FullPageLoading.js';
import OptionsContainer from '../../components/OptionsContainer/OptionsContainer.js';
import OptionsContainerDialog from '../../components/OptionsContainerDialog/OptionsContainerDialog.js';
import settings from '../../config/settings';

var OptionsContainersStatus = { LOADING: 'loading', READY: 'ready' };

const iconProps = {
  style: {
    marginRight: 0,
    marginTop: 4,
    marginLeft: 10
  },
  color: "#FFF",
  viewBox: '0 0 30 30'
}

export default class OptionsContainers extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      status          : OptionsContainersStatus.LOADING,
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
        { this.state.status === OptionsContainersStatus.LOADING &&
          <FullPageLoading />
        }

        { this.state.status !== OptionsContainersStatus.LOADING &&
          <div>
            <div>
              <RaisedButton onClick={ this._create } primary={ true } label="Crear" icon={ <ContentAdd {...iconProps}/> } />
            </div>

            <div className="options-containers-container">
              { this.state.options_containers.map((x, i) =>
                <OptionsContainer 
                  optionsContainer={ x }
                  key={ x.id }
                  allOptions={ this.state.allOptions }
                  updateSubmit={ this._updateSubmit } 
                  doDelete={ this._delete } 
                  />
              )}
            </div>
          </div>
        }

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
    this.setState({ status: OptionsContainersStatus.LOADING });
    var self = this;

    var user = this.props.route.getUser();
    var company_id = user.company_id;
    var url = settings.COMPANY_OPTIONS_CONTAINERS.replace(":company_id", company_id);
    var promise = fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json());

    promise.then(function(result) {
      var url2 = settings.COMPANY_POSSIBLE_OPTIONS.replace(":company_id", company_id);
      var promise2 = fetch(url2, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        } 
      })
      .then((response) => response.json());
      promise2.then(function(result2) {
        self.setState({ allOptions: result2 });
        self.setState({ options_containers: result });
        self.setState({ status: OptionsContainersStatus.READY });
      }, function(err) {
        console.log(err);
      });
    }, function(err) {
      console.log(err);
    });
  }

  _create = () => {
    this.setState({ 
      showCreateDialog: true, 
      createDialog:     (<OptionsContainerDialog 
                          onDestroy={ this._hideDialog }
                          onSubmit={ this._createSubmit }
                          allOptions={ this.state.allOptions }
                        />)
    });
  }

  _hideDialog = () => {
    this.setState({ showCreateDialog: false, createDialog: null });
  }

  _updateSubmit = (id, body) => {
    // Make request
    var self = this;
    var company_id = this.state.user.company_id;
    var container_id = id;
    var url = settings.COMPANY_OPTIONS_CONTAINER.replace(":company_id", company_id);
    url = url.replace(":id", container_id);

    var promise = fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      'body': JSON.stringify(body)
    })
    .then((response) => response.json());

    promise.then(function(result) {
      self._display("Opciones actualizadas con éxito");
      self._load();
    }, function(err) {
      self._display("Error interno. Consultar al administrador.");
      console.log(err);
    });
  }

  _createSubmit = (id, body) => {
    var self = this;
    var company_id = this.state.user.company_id;
    var url = settings.COMPANY_OPTIONS_CONTAINERS.replace(":company_id", company_id);

    console.log(JSON.stringify(body));

    var promise = fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      'body': JSON.stringify(body)
    })
    .then((response) => response.json());

    promise.then(function(result) {
      self._hideDialog();
      self._display("Opciones creadas con éxito");
      self._load();
    }, function(err) {
      self._display("Error interno. Consultar al administrador.");
      console.log(err);
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
    this.setState({ status: OptionsContainersStatus.LOADING });

    var self = this;
    var company_id = this.state.user.company_id;
    var url = settings.COMPANY_OPTIONS_CONTAINER.replace(":company_id", company_id);
    url = url.replace(":id", this.state.toDelete);
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(function(result) {
      self._display("Opciones eliminadas con éxito");
      self._load();
    }, function(err) {
      self._display("Error interno. Consultar al administrador.");
      self._load();
      console.log(err);
    });
  }
}
