import React, { Component } from 'react';
import styles from './styles.js'
import LineChart from '../../components/Charts/LineChart.js';
import BarChart from '../../components/Charts/BarChart.js';
import PieChart from '../../components/Charts/PieChart.js';
import Paper from 'material-ui/Paper';
import settings from '../../config/settings';

export default class Dashboard extends Component {
  render() {
      return (
        <div style={styles.chartContainer}>

        <Paper style={styles.chart} zDepth={2}>
        <h3 style={{textAlign: 'center'}}>Promedio de la empresa en el tiempo</h3>
        <LineChart id="lineChart0"
        uri= {settings.COMPANY_AVG.replace(':company_id', 1)}
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
            height: 550,
            duration: 300,
            useInteractiveGuideline: true
          }
        }}></LineChart>
        </Paper>

        <Paper style={styles.chart} zDepth={2}>
        <h3 style={{textAlign: 'center'}}>Respuestas totales de la empresa en el tiempo</h3>
        <BarChart id="barChart1"
        uri={settings.COMPANY_TOTAL.replace(':company_id', 1)}
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
          yFormat: 'd',
          options: {
            height: 550,
            duration: 300,
            useInteractiveGuideline: true
          }
        }}></BarChart>
        </Paper>
        <Paper style={styles.chart} zDepth={2}>
        <h3 style={{textAlign: 'center'}}>Distribución etaria de los encuestados de la compañía</h3>
        <BarChart id="barChart2"
        uri={settings.COMPANY_AGE.replace(':company_id', 1)}
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
        </Paper>
        <Paper style={styles.chart} zDepth={2}>
        <h3 style={{textAlign: 'center'}}>Distribución de géneros de los encuestados de la compañía</h3>
        <PieChart id="pieChart"
        uri={settings.COMPANY_GENDER.replace(':company_id', 1)}
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
            height: 550,
            duration: 300,
            useInteractiveGuideline: true
          }
        }}></PieChart>
        </Paper>
        </div>
      );
  }
}
