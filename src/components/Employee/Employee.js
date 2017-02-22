import React, { Component } from 'react'

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ActionDelete from 'material-ui/svg-icons/action/delete';

import settings from '../../config/settings';
import EmployeeEditForm from '../../components/EmployeeEditForm/EmployeeEditForm.js';

const styles = {
  chip: {
    margin: 4,
    fontSize: 10
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

const iconProps = {
  style: {
    marginRight: 0,
    marginTop: 4,
    marginLeft: 0
  },
  color: "#999",
  viewBox: '0 0 30 30'
}

export default class Employee extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      showEditDialog: false, 
      editDialog: null, 
      employee: this.props.employee 
    };
  }

  render() {
    return (
      <div className="employee-container">
        <Paper className="employee" >
          <div className="title">{ this.props.employee.name } { this.props.employee.last_name }</div>
          <div className="thumb-wrapper">
            <div className="thumb" style={{ backgroundImage: "url(" + this.props.employee.picture + ")" }}></div>
          </div>
          
          <div className="sellpoints-title">Puntos de venta:</div>
          <div className="sellpoints-wrapper" style={styles.wrapper}>
            { this.props.employee.SellPoints.map((x, i) =>
               <Chip style={styles.chip} className="chip">{ x.location }</Chip>
            )}
          </div>

          <Divider />
          <FlatButton className="option" label="Editar" 
            icon={ <ContentCreate {...iconProps}/> }
            onClick={ this._edit }
            />
          <FlatButton className="option" label="Eliminar" 
            icon={ <ActionDelete {...iconProps}/> } />
        </Paper>

        { this.state.showEditDialog && 
          this.state.editDialog
        }

      </div>
    );
  }

  _edit = () => {
    this.setState({ 
      showEditDialog: true, 
      editDialog:     (<EmployeeEditForm 
                        employee={ this.props.employee } 
                        onDestroy={ this._hideDialog } 
                        onSubmit={ this._update } 
                        allSellpoints={ this.props.allSellpoints }
                        />)
    });
  }

  _hideDialog = () => {
    this.setState({ showEditDialog: false, editDialog: null });
  }

  _update = (body) => {
    var self = this;
    var company_id = 2;
    var employee_id = this.props.employee.id;
    var url = settings.COMPANY_EMPLOYEE.replace(":company_id", company_id);
    url = url.replace(":id", employee_id);

    var promise = fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify(body)
    })
    .then((response) => response.json());

    promise.then(function(result) {
      self._hideDialog();
      self.props.updateEmployees();
    }, function(err) {
      self._hideDialog();
      console.log(err);
      // TODO: show error on dialog
    });
  }
}
