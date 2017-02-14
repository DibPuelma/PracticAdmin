import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

import LineChart from '../Charts/LineChart.js';
import BarChart from '../Charts/BarChart.js';
import PieChart from '../Charts/PieChart.js';
var data = {
  averageData: null,
  totalAnswersData: null,
  ageDistributionData: null,
  genderDistributionData: null,
}

export default class CardControlled extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      expanded: false,
      showDataCurrent: 'AVG',
      showDataFunctions: {
        AVG: (() => {
            return (
              <div style={{height: '500px'}}>
              <h3 style={{textAlign: 'center'}}>Promedio de la {props.type} en el tiempo</h3>
              <LineChart id={"lineChart1" + props.diff}
              uri={props.uris.avg}
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
                  height: 450,
                  duration: 300,
                  useInteractiveGuideline: true
                }
              }}></LineChart>
              </div>
            )
        }),
        TOTAL: (() => {
            return (
              <div style={{height: '500px'}}>
              <h3 style={{textAlign: 'center'}}>Respuestas totales de la {props.type} en el tiempo</h3>
              <LineChart id={"lineChart2" + props.diff}
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
                xAxisLabel: 'Fecha',
                yAxisLabel: 'Cantidad',
                xFormat: '%b %d %y',
                yFormat: ',.2f',
                options: {
                  height: 450,
                  duration: 300,
                  useInteractiveGuideline: true
                }
              }}></LineChart>
              </div>
            )
        }),
        AGE: (() => {
            return (
              <div style={{height: '500px'}}>
              <h3 style={{textAlign: 'center'}}>Distribución etaria de los encuestados de la {props.type}</h3>
              <BarChart id={"barChart" + props.diff}
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
                  height: 450,
                  duration: 300,
                  useInteractiveGuideline: true
                }
              }}></BarChart>
              </div>
            )
        }),
        GENDER: (() => {
            return (
              <div style={{height: '500px'}}>
              <h3 style={{textAlign: 'center'}}>Distribución de géneros de los encuestados de la {props.type}</h3>
              <PieChart id={"pieChart" + props.diff}
              uri={props.uris.gender}
              series={[
                {
                  valueKey:'count',
                  identifierValue: 'm',
                  identifierKey: 'gender',
                  key: 'Hombres',
                  color: '#7CD8EA'
                },
                {
                  valueKey:'count',
                  identifierValue: 'f',
                  identifierKey: 'gender',
                  key: 'Mujeres',
                  color: '#FFBAD2'
                }
              ]}
              graphCreator={{
                xAxisLabel: 'Edad',
                yAxisLabel: 'Cantidad',
                valueFormat: 'd',
                options: {
                  height: 450,
                  duration: 300,
                  useInteractiveGuideline: true
                }
              }}></PieChart>
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
    this.setState({expanded: toggle});
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

  render() {
    return (
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          title={this.props.title}
          subtitle={this.props.subtitle}
          avatar={this.props.avatar}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText style={{justifyContent: 'right'}}>
          <Toggle
            toggled={this.state.expanded}
            onToggle={this.handleToggle}
            labelPosition="right"
            label="Mostrar datos"
          />
        </CardText>
        <CardMedia
          style={{height: '500px'}}
          expandable={true}
        >
          {this.state.showDataFunctions[this.state.showDataCurrent]()}
        </CardMedia>
        <CardActions expandable={true}>
          <FlatButton label="Promedio" onClick={this.handleAverage} />
          <FlatButton label="Respuestas Totales" onClick={this.handleTotal} />
          <FlatButton label="Distribución etaria" onClick={this.handleAge} />
          <FlatButton label="Ditribución por género" onClick={this.handleGender} />
        </CardActions>
      </Card>
    );
  }
}
