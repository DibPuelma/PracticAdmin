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

  _addGraph(id, data, xAxisLabel, yAxisLabel, valueFormat, options, xType){
    var chart;
    console.log(valueFormat);

    //Regular pie chart example
    nvd3.addGraph(function() {
      chart = nvd3.models.pieChart()
      .labelType("percent")
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .showLabels(true)
      .valueFormat(d3.format(valueFormat));

      d3.select("#" + id)
      .datum(data)
      .transition().duration(350)
      .call(chart);

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
        responseJson.map((data, i) => {
          if (data[serie.identifierKey] === serie.identifierValue) {
            serie.label = serie.key;
            serie.value = data[serie.valueKey]
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
          value: serie.value,
          label: serie.label,
          color: serie.color
        })
      })

      this._addGraph(
        this.props.id,
        data,
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
}
