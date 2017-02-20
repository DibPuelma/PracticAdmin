import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';

import LineChart from '../Charts/LineChart.js';
import BarChart from '../Charts/BarChart.js';
import PieChart from '../Charts/PieChart.js';

import {Tabs, Tab} from 'material-ui/Tabs';

import dateManager from '../../lib/dateManager';

const customContentStyle = {
  width: '80%',
  maxWidth: 'none',
  paddingBottom: '40px'
};

export default class ChartsModal extends React.Component {

  constructor(props) {
    super(props);

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
      showDataCurrent: 'TOTAL',
      open: false,
      minDate: new Date(dateManager.getMonthStart(Date.now())),
      maxDate: new Date(Date.now()),
      showDataFunctions: {
        AVG: (() => {
          return (
            <div style={{height: '550px', marginBottom: '80px'}}>
            <h3 style={{textAlign: 'center', marginBottom: '5px'}}>Promedio {props.type} en el tiempo</h3>
            {this.datePicker}
            <LineChart
            id={"lineChart1" + props.diff}
            key={"lineChart1" + props.diff}
            uri={props.uris.number.replace(':start_date', dateManager.getString(this.state.minDate)).replace(':end_date', dateManager.getString(this.state.maxDate))}
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
              xFormat: '%m/%d/%y',
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
          console.log(this.state);
          return (
            <div style={{height: '550px', marginBottom: '80px'}}>
            <h3 style={{textAlign: 'center', marginBottom: '5px'}}>Respuestas totales {props.type} en el tiempo</h3>
            {this.datePicker}
            <BarChart
            id={"barChart1" + props.diff}
            key={"barChart1" + props.diff}
            uri={props.uris.total.replace(':start_date', dateManager.getString(this.state.minDate)).replace(':end_date', dateManager.getString(this.state.maxDate))}
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
              xFormat: '%m/%d/%y',
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
            <div style={{height: '550px', marginBottom: '80px'}}>
            <h3 style={{textAlign: 'center', marginBottom: '5px'}}>Distribución etaria de los encuestados {props.type}</h3>
            {this.datePicker}
            <BarChart
            id={"barChart2" + props.diff}
            key={"barChart2" + props.diff}
            uri={props.uris.age.replace(':start_date', dateManager.getString(this.state.minDate)).replace(':end_date', dateManager.getString(this.state.maxDate))}
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
            <div style={{height: '550px', marginBottom: '80px'}}>
            <h3 style={{textAlign: 'center', marginBottom: '5px'}}>Distribución de géneros de los encuestados {props.type}</h3>
            {this.datePicker}
            <PieChart
            id={"pieChart1" + props.diff}
            key={"pieChart1" + props.diff}
            uri={props.uris.gender.replace(':start_date', dateManager.getString(this.state.minDate)).replace(':end_date', dateManager.getString(this.state.maxDate))}
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
            <div style={{height: '550px', marginBottom: '80px'}}>
            <h3 style={{textAlign: 'center', marginBottom: '5px'}}>Cantidad de respuestas por opción {props.type}</h3>
            {this.datePicker}
            <PieChart
            id={"pieChart2" + props.diff}
            key={"pieChart2" + props.diff}
            uri={props.uris.options.replace(':start_date', dateManager.getString(this.state.minDate)).replace(':end_date', dateManager.getString(this.state.maxDate))}
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
            <div style={{height: '550px', marginBottom: '80px'}}>
            <h3 style={{textAlign: 'center', marginBottom: '5px'}}>Cantidad de respuestas {props.type}</h3>
            {this.datePicker}
            <PieChart
            id={"pieChart3" + props.diff}
            key={"pieChart3" + props.diff}
            uri={props.uris.boolean.replace(':start_date', dateManager.getString(this.state.minDate)).replace(':end_date', dateManager.getString(this.state.maxDate))}
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
            <div style={{height: '550px', marginBottom: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <h3 >Característica no disponible aun</h3>
            {this.datePicker}
            </div>
          )
        })
      }
    };
    this.datePicker = (
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
      <DatePicker
      onChange={this.handleChangeMinDate}
      floatingLabelText="Desde"
      defaultDate={this.state.minDate}
      formatDate={new Intl.DateTimeFormat('es-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format}
      DateTimeFormat={Intl.DateTimeFormat}
      locale='es-US'
      maxDate={new Date(Date.now())}
      />
      <DatePicker
      onChange={this.handleChangeMaxDate}
      floatingLabelText="Hasta"
      defaultDate={this.state.maxDate}
      formatDate={new Intl.DateTimeFormat('es-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format}
      DateTimeFormat={Intl.DateTimeFormat}
      locale='es-US'
      maxDate={new Date(Date.now())}
      />
      </div>
    )
  }

  handleChangeMinDate = (event, date) => {
    this.setState({minDate: date});
  };

  handleChangeMaxDate = (event, date) => {
    this.setState({maxDate: date});
  };

  handleTab = (value) => {
    this.setState({showDataCurrent: value})
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

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
      label="Cerrar"
      primary={true}
      onTouchTap={this.handleClose}
      />
    ];

    return (
      <div>
      <RaisedButton
      label="Más información"
      secondary={true}
      fullWidth={true}
      icon={<AddIcon/>}
      onTouchTap={this.handleOpen}
      />
      <Dialog
      actions={actions}
      onRequestClose={this.handleClose}
      open={this.state.open}
      contentStyle={customContentStyle}
      >
      <Tabs
      value={this.state.showDataCurrent}
      onChange={this.handleTab}
      >
      {this._getTabs()}
      </Tabs>
      {this.state.showDataFunctions[this.state.showDataCurrent]()}
      </Dialog>
      </div>
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
