import React, { Component } from 'react';
import * as d3 from 'd3';
import nvd3 from 'nvd3';

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

  render(){
    if(!this.state.ready) {
      return (
        <h3> CARGANDO </h3>
      )
    }
    else {
      return (
        <svg id={this.props.id} >
        </svg>
      )
    }
  }

  _addGraph(id, data, xAxisLabel, yAxisLabel, xFormat, yFormat, options, xType){
    var chart;

    nvd3.addGraph(function() {
      var chart = nvd3.models.multiBarChart()
      .reduceXTicks(false)   //If 'false', every single x-axis tick label will be rendered.
      .rotateLabels(0)      //Angle to rotate x-axis labels.
      .showControls(true)   //Allow user to switch between 'Grouped' and 'Stacked' mode.
      .groupSpacing(0.1)    //Distance between each group of bars.
      ;

      chart.xAxis
      .tickFormat(d3.format(xFormat))
      .axisLabel(xAxisLabel);
      // .tickFormat(d3.format(',f'));

      chart.yAxis
      .tickFormat(d3.format(yFormat))
      .axisLabel(yAxisLabel);
      // .tickFormat(d3.format(',.1f'));

      d3.select('#' + id)
      .datum(data)
      .call(chart);

      nvd3.utils.windowResize(chart.update);

      return chart;
    });
  }

  _getDataAndCreateGraph(uri) {
    fetch(uri, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.props.series.map((serie, i) => {
        serie.objectValues = {};
        serie.values = []
        var firstValue = responseJson[0].age;
        var lastValue = responseJson[responseJson.length - 1].age;
        for (var j = firstValue; j <= lastValue; j++) {
          serie.objectValues[j] = 0;
        }
        responseJson.map((data, i) => {
          if (data[serie.identifierKey] === serie.identifierValue) {
            var yValue = data[serie.yValue];
            var xValue = this.props.xType === 'time' ? new Date(data[this.props.xValue]).getTime() : data[this.props.xValue];
            serie.objectValues[xValue] = yValue;
          }
        })
        for (var key in serie.objectValues) {
          if (serie.objectValues.hasOwnProperty(key)) {
            serie.values.push({x: key, y: serie.objectValues[key]})
          }
        }
      })

      var data = [];
      this.props.series.map((serie, i) => {
        data.push({
          values: serie.values,
          key: serie.key,
          color: serie.color
        })
      })

      this._addGraph(
        this.props.id,
        data,
        this.props.graphCreator.xAxisLabel,
        this.props.graphCreator.yAxisLabel,
        this.props.graphCreator.xFormat,
        this.props.graphCreator.yFormat,
        this.props.graphCreator.options,
        this.props.xType
      );
      this.setState({ready: true});
    })
    .catch((error) => {
      console.error(error);
    });
  }
}
