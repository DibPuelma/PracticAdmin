import React, { Component } from 'react'

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';

import ContentCreate from 'material-ui/svg-icons/content/create';

const iconProps = {
  style: {
    marginRight: 0,
    marginTop: 4,
    marginLeft: 0
  },
  color: "#999",
  viewBox: '0 0 30 30'
}
export default class SellPoint extends Component {
  render() {
    return (
      <div className="sellpoint-container">
        <Paper className="sellpoint" >
          <div className="title">{ this.props.sellpoint.location }</div>
          <Divider />
          <FlatButton className="option" label="Editar" 
            icon={ <ContentCreate {...iconProps}/> }
            onClick={ () => this.props.onEdit(this.props.sellpoint) }
            />
        </Paper>
      </div>
    );
  }
}
