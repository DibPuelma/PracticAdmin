import React from 'react';
import {Card, CardHeader, CardMedia, CardText, CardActions} from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import {Tabs, Tab} from 'material-ui/Tabs';

import ChartsModal from '../Charts/ChartsModal';
import DataComparisonBadge from '../Badges/DataComparisonBadge';
import PieComparisonBadge from '../Badges/PieComparisonBadge';

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
            <DataComparisonBadge uri={this.props.uris.number_by_gender} title='Promedio'/>
          )
        }),
        TOTAL: (() => {
          return (
            <DataComparisonBadge uri={this.props.uris.total_by_gender} title='Respuestas'/>
          )
        }),
        AGE: (() => {
          return (
            <DataComparisonBadge uri={this.props.uris.avg_age} title='Edad Promedio'/>
          )
        }),
        GENDER: (() => {
          return (
            <div style={{height: '550px', marginBottom: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <h3 >Característica no disponible aun</h3>
            </div>
          )
        }),
        OPTIONS: (() => {
          return (
            <PieComparisonBadge uri={this.props.uris.options} title="Opciones Escogidas" />
          )
        }),
        BOOLEAN: (() => {
          return (
            <PieComparisonBadge uri={this.props.uris.boolean} title="Respuestas" />
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
