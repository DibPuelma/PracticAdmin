import React from 'react';
import {Card, CardHeader, CardMedia, CardText, CardActions} from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import ChartsModal from '../Charts/ChartsModal';

import {Tabs, Tab} from 'material-ui/Tabs';

export default class CardControlled extends React.Component {

  constructor(props) {
    super(props);
    // this.tabGetter = {
    //   total: <Tab label="Respuestas Totales" value="TOTAL" />,
    //   age: <Tab label="Distribución Etaria" value="AGE" />,
    //   gender: <Tab label="Distribución por Género" value="GENDER" />,
    //   number:  <Tab label="Promedio en el Tiempo" value="AVG" />,
    //   options: <Tab label="Distribución de Opciones" value="OPTIONS" />,
    //   boolean: <Tab label="Distribución de Respuestas" value="BOOLEAN" />,
    //   text: <Tab label="Palabras Relevantes" value="TEXT" />
    // }
    this.state = {
      ready: false,
      expanded: false,
      open: false
    }
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleToggle = (event, toggle) => {
    this.props.expand(this.props.diff, toggle);
    this.setState({expanded: toggle});
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    return (
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
      <CardHeader
      title={this.props.title}
      subtitle={this.props.subtitle}
      avatar={this.props.avatar}
      actAsExpander={true}
      />
      <CardText style={{justifyContent: 'right'}}>
      <Toggle
      toggled={this.state.expanded}
      onToggle={this.handleToggle}
      labelPosition="right"
      label="Mostrar datos"
      />
      </CardText>
      {
        // <Tabs
        // expandable={true}
        // value={this.state.showDataCurrent}
        // onChange={this.handleTab}
        // >
        // {this._getTabs()}
        // </Tabs>
      }
      <CardMedia
      style={{height: '620px'}}
      expandable={true}
      >
      </CardMedia>
      <CardActions expandable={true}>
      <ChartsModal uris={this.props.uris} diff={this.props.diff} type={this.props.type}/>
      </CardActions>

      </Card>
    );
  }

  _getTabs = () => {
    var response = [];
    for (var key in this.props.uris) {
      if (this.props.uris.hasOwnProperty(key)) {
        response.push(this.tabGetter[key]);
      }
    }
    return response;
  }
}
