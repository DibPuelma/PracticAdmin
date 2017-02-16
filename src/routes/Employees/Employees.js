import React, { Component } from 'react'

import FullPageLoading from '../../components/FullPageLoading/FullPageLoading.js';
import Employee from '../../components/Employee/Employee.js';
import settings from '../../config/settings';

var EmployeesStatus = { LOADING: 'loading', READY: 'ready' };

export default class Employees extends Component {
  constructor(props) {
    super(props);
    this.state = { status: EmployeesStatus.LOADING };
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
        <div className="employees-container">
          { this.state.employees.map((x, i) =>
            <Employee employee={ x } />
          )}
        </div>
      </div>
    );
  }

  _load() {
    var self = this;

    var company_id = 2;
    var url = settings.COMPANY_EMPLOYEE.replace(":company_id", company_id);
    var promise = fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, 
    })
    .then((response) => response.json());

    promise.then(function(result) {
      self.setState({ employees: result });
      self.setState({ status: EmployeesStatus.READY });
    }, function(err) {
      console.log(err);
    });
  }
}
