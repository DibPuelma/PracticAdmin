import React, { Component } from 'react'

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';

import ContentCreate from 'material-ui/svg-icons/content/create';
import ActionDelete from 'material-ui/svg-icons/action/delete';

const iconProps = {
  style: {
    marginRight: 0,
    marginTop: 4,
    marginLeft: 0
  },
  color: "#999",
  viewBox: '0 0 30 30'
}

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

export default class Employee extends Component {
  constructor(props) {
    super(props);
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
            onClick={ this._onEdit }
            />
          <FlatButton className="option" label="Eliminar" 
            icon={ <ActionDelete {...iconProps}/> } />
        </Paper>
      </div>
    );
  }
}
