import React, { Component } from 'react'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import ContentAdd from 'material-ui/svg-icons/content/add';

import FullPageLoading from '../../components/FullPageLoading/FullPageLoading.js';
import Employee from '../../components/Employee/Employee.js';
import settings from '../../config/settings';
import EmployeeEditForm from '../../components/EmployeeEditForm/EmployeeEditForm.js';

var EmployeesStatus = { LOADING: 'loading', READY: 'ready' };

const iconProps = {
  style: {
    marginRight: 0,
    marginTop: 4,
    marginLeft: 10
  },
  color: "#FFF",
  viewBox: '0 0 30 30'
}

export default class Employees extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      status          : EmployeesStatus.LOADING,
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
        { this.state.status === EmployeesStatus.LOADING &&
          <FullPageLoading />
        }

        { this.state.status !== EmployeesStatus.LOADING &&
          <div>
            <div>
              <RaisedButton onClick={ this._create } primary={ true } label="Crear" icon={ <ContentAdd {...iconProps}/> } />
            </div>

            <div className="employees-container">
              { this.state.employees.map((x, i) =>
                <Employee 
                  employee={ x }
                  allSellpoints={ this.state.allSellpoints }
                  updateEmployees={ this._load }
                  user={ this.state.user }
                  doDelete={ this._delete }
                  key={ x.id }
                  display={ this._display }
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
    this.setState({ status: EmployeesStatus.LOADING });
    var self = this;

    var company_id = this.state.user.company_id;
    var url = settings.COMPANY_EMPLOYEES.replace(":company_id", company_id);
    var promise = fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, 
    })
    .then((response) => response.json());

    promise.then(function(result) {
      var url2 = settings.COMPANY_SELLPOINTS.replace(":company_id", company_id);
      var promise2 = fetch(url2, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, 
      })
      .then((response) => response.json());

      promise2.then(function(result2) {
        self.setState({ allSellpoints: result2 });
        self.setState({ employees: result });
        self.setState({ status: EmployeesStatus.READY });
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
      createDialog:     (<EmployeeEditForm 
                          onDestroy={ this._hideDialog }
                          onSubmit={ this._createSubmit }
                          allSellpoints={ this.state.allSellpoints }
                          user={ this.state.user }
                        />)
    });
  }

  _hideDialog = () => {
    this.setState({ showCreateDialog: false, createDialog: null });
  }

  _createSubmit = (body) => {
    var self = this;
    var company_id = this.state.user.company_id;
    var url = settings.COMPANY_EMPLOYEES.replace(":company_id", company_id);

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
      self._display("Empleado creado con éxito");
      self._load();
    }, function(err) {
      self._hideDialog();
      self._display("Error interno. Consultar al administrador.");
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
    this.setState({ status: EmployeesStatus.LOADING });

    var self = this;
    var company_id = this.state.user.company_id;
    var url = settings.COMPANY_EMPLOYEE.replace(":company_id", company_id);
    url = url.replace(":id", this.state.toDelete);
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(function(result) {
      self._display("Empleado eliminado con éxito");
      self._load();
    }, function(err) {
      self._display("Error interno. Consultar al administrador.");
      self._load();
      console.log(err);
    });
  }
}
