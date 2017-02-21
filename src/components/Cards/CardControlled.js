import React from 'react';
import {Card, CardHeader, CardMedia, CardText, CardActions} from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import {Tabs, Tab} from 'material-ui/Tabs';

import ChartsModal from '../Charts/ChartsModal';
import ComparisonBadge from '../Badges/ComparisonBadge';

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

    this.tabGetter = {
      total: <Tab label="Respuestas Totales" value="TOTAL" />,
      age: <Tab label="Edades" value="AGE" />,
      number:  <Tab label="Promedio" value="AVG" />,
      options: <Tab label="Opciones elegidas" value="OPTIONS" />,
      boolean: <Tab label="Respuestas sí o no" value="BOOLEAN" />,
      text: <Tab label="Palabras Relevantes" value="TEXT" />
    }

    this.state = {
      ready: false,
      expanded: false,
      open: false,
      popoverOpen: false,
      showDataCurrent: 'TOTAL',
      showDataFunctions: {
        AVG: (() => {
          return (
            <ComparisonBadge uri={this.props.uris.number_by_gender} title='Promedio'/>
          )
        }),
        TOTAL: (() => {
          return (
            <ComparisonBadge uri={this.props.uris.total_by_gender} title='Respuestas'/>
          )
        }),
        AGE: (() => {
          return (
            <ComparisonBadge uri={this.props.uris.avg_age} title='Edad promedio'/>
          )
        }),
        GENDER: (() => {
          return (
            <div style={{height: '550px', marginBottom: '80px'}}>
            <h3 style={{textAlign: 'center', marginBottom: '5px'}}>Distribución de géneros de los encuestados {props.type}</h3>
            </div>
          )
        }),
        OPTIONS: (() => {
          return (
            <div style={{height: '550px', marginBottom: '80px'}}>
            <h3 style={{textAlign: 'center', marginBottom: '5px'}}>Cantidad de respuestas por opción {props.type}</h3>
            </div>
          )
        }),
        BOOLEAN: (() => {
          return (
            <div style={{height: '550px', marginBottom: '80px'}}>
            <h3 style={{textAlign: 'center', marginBottom: '5px'}}>Cantidad de respuestas {props.type}</h3>
            </div>
          )
        }),
        TEXT: (() => {
          return (
            <div style={{height: '550px', marginBottom: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <h3 >Característica no disponible aun</h3>
            </div>
          )
        })
      }
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

  handleTab = (value) => {
    this.setState({showDataCurrent: value})
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
      <Tabs
      expandable={true}
      onChange={this.handleTab}
      value={this.state.showDataCurrent}
      >
      {this._getTabs()}
      </Tabs>
      <CardMedia
      style={{justifyContent: 'center', alignItems: 'center', display: 'flex'}}
      expandable={true}
      >
      {this.state.showDataFunctions[this.state.showDataCurrent]()}
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
