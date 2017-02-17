import React from 'react';
import {Card, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

import LineChart from '../Charts/LineChart.js';
import BarChart from '../Charts/BarChart.js';
import PieChart from '../Charts/PieChart.js';

import {Tabs, Tab} from 'material-ui/Tabs';


export default class CardControlled extends React.Component {

  constructor(props) {
    super(props);
    this.buttonGetter = {
      total: <FlatButton label="Respuestas Totales" onClick={this.handleTotal} />,
      age: <FlatButton label="Distribución etaria" onClick={this.handleAge} />,
      gender: <FlatButton label="Ditribución por género" onClick={this.handleGender} />,
      number: <FlatButton label="Promedio en el tiempo" onClick={this.handleAverage} />,
      options: <FlatButton label="Distribución de opciones" onClick={this.handleOptions} />,
      boolean: <FlatButton label="Distribución de respuestas" onClick={this.handleBoolean} />,
      text: <FlatButton label="Palabras relevantes" onClick={this.handleText} />
    }
    this.tabGetter = {
      total: <Tab label="Respuestas Totales" value="TOTAL" />,
      age: <Tab label="Distribución Etaria" value="AGE" />,
      gender: <Tab label="Distribución por Género" value="GENDER" />,
      number:  <Tab label="Promedio en el Tiempo" value="AVG" />,
      options: <Tab label="Distribución de Opciones" value="OPTIONS" />,
      boolean: <Tab label="Distribución de Respuestas" value="BOOLEAN" />,
      text: <Tab label="Palabras Relevantes" value="TEXT" />
    }
    this.state = {
      ready: false,
      expanded: false,
      showDataCurrent: 'TOTAL',
      showDataFunctions: {
        AVG: (() => {
          return (
            <div style={{height: '550px'}}>
            <h3 style={{textAlign: 'center'}}>Promedio de la {props.type} en el tiempo</h3>
            <LineChart
            id={"lineChart1" + props.diff}
            key={"lineChart1" + props.diff}
            uri={props.uris.number}
            xValue='created_at'
            xType='time'
            series={[
              {
                yValue: 'avg',
                key: 'Promedio del día',
                color: '#ff7f0e'
              },
              {
                yValue: 'acum_avg',
                key: 'Promedio acumulado',
                color: '#2ca02c'
              }
            ]}
            graphCreator={{
              xAxisLabel: 'Fecha',
              yAxisLabel: 'Estrellas',
              xFormat: '%b %d %y',
              yFormat: ',.2f',
              options: {
                height: 500,
                duration: 300,
                useInteractiveGuideline: true
              }
            }}></LineChart>
            </div>
          )
        }),
        TOTAL: (() => {
          return (
            <div style={{height: '550px'}}>
            <h3 style={{textAlign: 'center'}}>Respuestas totales de la {props.type} en el tiempo</h3>
            <BarChart
            id={"barChart1" + props.diff}
            key={"barChart1" + props.diff}
            uri={props.uris.total}
            xValue='created_at'
            xType='time'
            series={
              [
                {
                  yValue:'count',
                  key: 'Respuestas del día',
                  color: '#ff7f0e'
                }
              ]
            }
            graphCreator={{
              xAxisLabel: '',
              yAxisLabel: '',
              xFormat: '%b %d %y',
              yFormat: 'd',
              options: {
                height: 550,
                duration: 300,
                useInteractiveGuideline: true,
                reduceXTicks: true,
                showControls: false,
                rotateLabels: -45
              }
            }}></BarChart>
            </div>
          )
        }),
        AGE: (() => {
          return (
            <div style={{height: '550px'}}>
            <h3 style={{textAlign: 'center'}}>Distribución etaria de los encuestados de la {props.type}</h3>
            <BarChart
            id={"barChart2" + props.diff}
            key={"barChart2" + props.diff}
            uri={props.uris.age}
            xValue='age'
            xType='integer'
            series={[
              {
                yValue:'count',
                identifierValue: 'm',
                identifierKey: 'gender',
                key: 'Hombres',
                color: '#7CD8EA'
              },
              {
                yValue:'count',
                identifierValue: 'f',
                identifierKey: 'gender',
                key: 'Mujeres',
                color: '#FFBAD2'
              }
            ]}
            graphCreator={{
              xAxisLabel: 'Edad',
              yAxisLabel: 'Cantidad',
              xFormat: 'd',
              yFormat: 'd',
              options: {
                height: 550,
                duration: 300,
                useInteractiveGuideline: true
              }
            }}></BarChart>
            </div>
          )
        }),
        GENDER: (() => {
          return (
            <div style={{height: '550px'}}>
            <h3 style={{textAlign: 'center'}}>Distribución de géneros de los encuestados de la {props.type}</h3>
            <PieChart
            id={"pieChart1" + props.diff}
            key={"pieChart1" + props.diff}
            uri={props.uris.gender}
            graphCreator={{
              xAxisLabel: 'Edad',
              yAxisLabel: 'Cantidad',
              valueFormat: 'd',
              options: {
                height: 550,
                duration: 300,
                useInteractiveGuideline: true
              }
            }}></PieChart>
            </div>
          )
        }),
        OPTIONS: (() => {
          return (
            <div style={{height: '550px'}}>
            <h3 style={{textAlign: 'center'}}>Cantidad de respuestas por opción de la {props.type}</h3>
            <PieChart
            id={"pieChart2" + props.diff}
            key={"pieChart2" + props.diff}
            uri={props.uris.options}
            graphCreator={{
              xAxisLabel: 'Opción',
              yAxisLabel: 'Cantidad',
              valueFormat: 'd',
              options: {
                height: 550,
                duration: 300,
                useInteractiveGuideline: true
              }
            }}></PieChart>
            </div>
          )
        }),
        BOOLEAN: (() => {
          return (
            <div style={{height: '550px'}}>
            <h3 style={{textAlign: 'center'}}>Cantidad de respuestas de la {props.type}</h3>
            <PieChart
            id={"pieChart3" + props.diff}
            key={"pieChart3" + props.diff}
            uri={props.uris.boolean}
            graphCreator={{
              xAxisLabel: 'Respuesta',
              yAxisLabel: 'Cantidad',
              valueFormat: 'd',
              options: {
                height: 550,
                duration: 300,
                useInteractiveGuideline: true
              }
            }}></PieChart>
            </div>
          )
        }),
        TEXT: (() => {
          return (
            <div style={{height: '550px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <h3 >Característica no disponible aun</h3>
            </div>
          )
        })
      }
    };
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleToggle = (event, toggle) => {
    this.props.expand(this.props.diff, toggle);
    this.setState({expanded: toggle});
  };

  handleTab = (value) => {
    this.setState({showDataCurrent: value}, () => {console.log(this.state)})
  };

  handleAverage = () => {
    this.setState({showDataCurrent: 'AVG'});
  };

  handleTotal = () => {
    this.setState({showDataCurrent: 'TOTAL'});
  };

  handleAge = () => {
    this.setState({showDataCurrent: 'AGE'});
  };

  handleGender = () => {
    this.setState({showDataCurrent: 'GENDER'});
  };

  handleOptions = () => {
    this.setState({showDataCurrent: 'OPTIONS'});
  };

  handleBoolean = () => {
    this.setState({showDataCurrent: 'BOOLEAN'});
  };

  handleText = () => {
    this.setState({showDataCurrent: 'TEXT'});
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
      value={this.state.showDataCurrent}
      onChange={this.handleTab}
      >
      {this._getTabs()}
      </Tabs>
      <CardMedia
      style={{height: '620px'}}
      expandable={true}
      >
      {this.state.showDataFunctions[this.state.showDataCurrent]()}
      </CardMedia>


      </Card>
    );
  }
  _getButtons = () => {
    var response = [];
    for (var key in this.props.uris) {
      if (this.props.uris.hasOwnProperty(key)) {
        response.push(this.buttonGetter[key]);
      }
    }
    return response;
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
