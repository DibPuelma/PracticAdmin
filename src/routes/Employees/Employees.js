import React, { Component } from 'react'

import FullPageLoading from '../../components/FullPageLoading/FullPageLoading.js';
import Employee from '../../components/Employee/Employee.js';
import settings from '../../config/settings';
import EmployeeEditForm from '../../components/EmployeeEditForm/EmployeeEditForm.js';
import RaisedButton from 'material-ui/RaisedButton';

var EmployeesStatus = { LOADING: 'loading', READY: 'ready' };

export default class Employees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status          : EmployeesStatus.LOADING,
      showCreateDialog: false,
      createDialog    : null,
      user            : this.props.route.getUser()
    };
  }

  componentDidMount() {
    this._load();
  }

  render() {
    if (this.state.status === EmployeesStatus.LOADING) {
      return (
        <FullPageLoading />
      );
    }

    return (
      <div>
        <div>
          <RaisedButton onClick={ this._create } primary={ true } label="Crear" />
        </div>

        <div className="employees-container">
          { this.state.employees.map((x, i) =>
            <Employee
              employee={ x }
              allSellpoints={ this.state.allSellpoints }
              updateEmployees={ this._load }
              user={ this.state.user }
              />
          )}
        </div>

        { this.state.showCreateDialog &&
          this.state.createDialog
        }

      </div>
    );
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
      console.log(result);
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

  _createSubmit = (data) => {
    var body = {
      name             : data.name,
      last_name        : data.last_name,
      newSellpoints    : data.newSellpoints,
      deletedSellpoints: data.deletedSellpoints,
    }
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
      if(data.pictureUrl === ''){
        var formData = new FormData();
        formData.append('picture', data.picture);
        fetch(settings.EMPLOYEE_ADDPICTURE.replace(':company_id', company_id).replace(':employee_id', result.id), {
          method: 'PUT',
          body: formData
        })
        .then((response) => response.json())
        .then((result) => {
          self._hideDialog();
          self._load();
        })
      }
      else {
        self._hideDialog();
        self._load();
      }
    }, function(err) {
      self._hideDialog();
      console.log(err);
      // TODO: show error on dialog
    });
  }
}
