import React, { Component } from 'react';
import styles from './styles.js'
import LineChart from '../../lib/Charts/LineChart.js';
import BarChart from '../../lib/Charts/BarChart.js';

export default class Dashboard extends Component {
  render() {
      return (
        <div style={styles.chartContainer}>

        <div style={styles.chart}>
        <LineChart id="lineChart0"
        uri='http://www.localhost:3000/company/1/average_stars'
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

        <div style={styles.chart}>
        <LineChart id="lineChart2"
        uri='http://www.localhost:3000/company/1/total_responses'
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

        <div style={styles.chart}>
        <BarChart id="barChart1"
        uri='http://www.localhost:3000/company/1/respondents_age'
        xValue='age'
        xType='integer'
        series={[
          {
            yValue:'count',
            identifierValue: 'm',
            identifierKey: 'gender',
            key: 'Cantidad de hombres',
            color: '#7CD8EA'
          },
          {
            yValue:'count',
            identifierValue: 'f',
            identifierKey: 'gender',
            key: 'Cantidad de mujeres',
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

        </div>
      );
  }
}
