import React, { Component } from 'react';
import * as d3 from 'd3';
import nvd3 from 'nvd3';
import CircularProgress from 'material-ui/CircularProgress';
import CircularProgressStyle from '../../styles/CircularProgress';

export default class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false
    }
  }

  componentDidMount() {
    this._getDataAndCreateGraph(this.props.uri);
  }

  componentWillReceiveProps() {
    this.setState({ready: false}, () => {
      this._getDataAndCreateGraph(this.props.uri);
    })
  }

  render(){
    if(!this.state.ready) {
      return (
        <CircularProgress style={CircularProgressStyle} size={80} thickness={5} />
      )
    }
    else {
      return (
        <svg id={this.props.id} >
        </svg>
      )
    }
  }

  _addGraph(id, data, xAxisLabel, yAxisLabel, valueFormat, options, xType){
    var chart;

    //Regular pie chart example
    nvd3.addGraph(function() {
      chart = nvd3.models.pieChart()
      .labelType("percent")
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .showLabels(true)
      .valueFormat(d3.format(valueFormat))
      .noData("Aún no hay respuestas o lo que pides no existe")

      console.log(data);
      d3.select("#" + id)
      .datum(data)
      .transition().duration(350)
      .call(chart);

      return chart;
    });
  }

  _getDataAndCreateGraph(uri) {
    console.log(uri);
    fetch(uri, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      var chartData = [];
      if(responseJson.length !== 0){
        responseJson.map((data, i) => {
          var serie = {};
          var label = '';
          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              if(key === 'count'){
                serie.value = data[key];
              }
              else {
                label += this._getLabel(data[key]) + ' ';
              }
            }
          }
          serie.label = label;
          return chartData.push(serie);
        })
      }
      this._addGraph(
        this.props.id,
        chartData,
        this.props.graphCreator.xAxisLabel,
        this.props.graphCreator.yAxisLabel,
        this.props.graphCreator.valueFormat,
        this.props.graphCreator.options,
        this.props.xType
      );
      this.setState({ready: true});
    })
    .catch((error) => {
      console.error(error);
    });
  }
  _getLabel(unprocessedLabel){
    switch (unprocessedLabel) {
      case 'm':
      return 'Hombres';
      case 'f':
      return 'Mujeres';
      case true:
      return 'Sí'
      case false:
      return 'No'
      default:
      return unprocessedLabel;
    }
  }
}
