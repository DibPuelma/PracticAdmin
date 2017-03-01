import React, { Component } from 'react'

import FullPageLoading from '../../components/FullPageLoading/FullPageLoading';
import Employee from '../../components/Employee/Employee';
import settings from '../../config/settings';
import EmployeeEditForm from '../../components/EmployeeEditForm/EmployeeEditForm';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import CompanyCard from '../../components/Cards/CompanyCard';
import CompanyEditForm from '../../components/Forms/CompanyEditForm';


var CompaniesStatus = { LOADING: 'loading', READY: 'ready' };

export default class CompaniesAdministration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: CompaniesStatus.LOADING,
      snackbarOpen: false,
      showCreateDialog: false,
      createDialog: null,
      expanded: null,
      doubleExpanded: false,
      open: false,
      message: '',
      user: this.props.route.getUser()
    };
  }

  componentDidMount() {
    this._load();
  }

  render() {
    if (!this.state.user.is_super_user){
      return (
        <h1> No tienes los permisos para administrar compañías </h1>
      )
    }
    if (this.state.status === CompaniesStatus.LOADING) {
      return (
        <FullPageLoading />
      );
    }

    return (
      <div>
      <div>
      <RaisedButton onTouchTap={this._handleOpen}
      secondary={true}
      label="Crear nueva empresa"
      fullWidth={true}
      style={{marginBottom: '20px'}}
      />
      </div>

      <div >
      { this.state.companies.map((company, i) =>
        <CompanyCard
        key={i}
        company={company}
        expand={(id, toggle) => (this._expandListElement(id, toggle))}
        ref={company.id}
        diff={company.id}
        handleSnackbarOpen={this._handleSnackbarOpen}
        reload={this._reload}
        />
      )}
      </div>
      <Dialog
          title="Creación de empresa"
          modal={false}
          open={this.state.open}
          onRequestClose={this._handleClose}
          autoScrollBodyContent={true}
        >
          <CompanyEditForm handleSnackbarOpen={this._handleSnackbarOpen}
          reload={this._reload}
          handleClose={this._handleClose}
          />
        </Dialog>
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.message}
          autoHideDuration={2000}
          onRequestClose={this._handleSnackbarClose}
          style={{textAlign: 'center'}}
        />
      </div>
    );
  }


  _handleSnackbarOpen = (message) => {
    this.setState({message: message}, () => {
      this.setState({
        snackbarOpen: true
      });
    })
  };

  _handleSnackbarClose = () => {
    this.setState({snackbarOpen: false});
  };

  _handleOpen = () => {
    this.setState({open: true});
  };

  _handleClose = () => {
    this.setState({open: false});
  };

  _expandListElement = (id, toggle) => {
    if (toggle) {
      if(this.state.expanded === null){
        this.setState({expanded: id})
      }
      else{
        var ref = this.state.expanded;
        this.setState({doubleExpanded: true})
        this.setState({expanded: id}, () => {
          this.refs[ref].handleToggle(null, false);
        })
      }
    }
    else {
      if(this.state.doubleExpanded){
        this.setState({doubleExpanded: false})
      }
      else {
        this.setState({expanded: null})
      }
    }
  }

  _reload = () => {
    this.setState({status: CompaniesStatus.LOADING}, () => {
      this._load();
    })
  }

  _load = () => {
    var url = settings.COMPANIES;
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((result) => {
      this.setState({
        companies: result,
        status: CompaniesStatus.READY
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }
  //
  // _hideDialog = () => {
  //   this.setState({ showCreateDialog: false, createDialog: null });
  // }
  //

}
