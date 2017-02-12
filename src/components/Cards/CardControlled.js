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
var showData = {
  AVG: (() => {
    if (data.averageData === null){
      data.averageData = (
        <div style={{height: '500px'}}>
        <LineChart id="lineChart1"
        uri='http://www.localhost:3000/company/1/sell_point/1/average_stars'
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
    }
    return data.averageData;
  }),
  TOTAL: (() => {
    if(data.totalAnswersData === null) {
      data.totalAnswersData = (
        <div style={{height: '500px'}}>
        <LineChart id="lineChart2"
        uri='http://www.localhost:3000/company/1/sell_point/1/total_responses'
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
    }
    return data.totalAnswersData;
  }),
  AGE: (() => {
    if(data.ageDistributionData === null) {
      data.ageDistributionData = (
        <div style={{height: '500px'}}>
        <BarChart id="barChart1"
        uri='http://www.localhost:3000/company/1/sell_point/1/respondents_age'
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
    }
    return data.ageDistributionData;
  }),
  GENDER: (() => {
    if(data.genderDistributionData === null) {
      data.genderDistributionData = (
        <div style={{height: '500px'}}>
        <PieChart id="pieChart"
        uri='http://www.localhost:3000/company/1/sell_point/1/respondents_gender'
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
    }
    return data.genderDistributionData;
  })
}
export default class CardControlled extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      expanded: false,
      showData: 'AVG'
    };
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleToggle = (event, toggle) => {
    this.setState({expanded: toggle});
  };

  handleAverage = () => {
    this.setState({showData: 'AVG'});
  };

  handleTotal = () => {
    this.setState({showData: 'TOTAL'});
  };

  handleAge = () => {
    this.setState({showData: 'AGE'});
  };

  handleGender = () => {
    this.setState({showData: 'GENDER'});
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
          {showData[this.state.showData]()}
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
