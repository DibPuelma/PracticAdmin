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

  _addGraph(id, data, xAxisLabel, yAxisLabel, xFormat, yFormat, options, xType){
    var chart;

    nvd3.addGraph(function() {
      chart = nvd3.models.multiBarChart()
      .options(options)
      .noData("Aún no hay respuestas o lo que pides no existe")
      ;

      chart.xAxis
      .tickFormat(function(d) {
        return xType === 'time' ? d3.time.format(xFormat)(new Date(parseFloat(d))) : d3.format(xFormat)(d);
      })
      .axisLabel(xAxisLabel);

      chart.yAxis
      .tickFormat(d3.format(yFormat))
      .axisLabel(yAxisLabel);

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
        if(responseJson.length !== 0 && this.props.xType !== 'time'){
          var firstValue = responseJson[0][this.props.xValue];
          var lastValue = responseJson[responseJson.length - 1][this.props.xValue];
          for (var j = firstValue; j <= lastValue; j++) {
            serie.objectValues[j] = 0;
          }
        }
        responseJson.map((data, i) => {
          if (data[serie.identifierKey] === serie.identifierValue) {
            var yValue = parseInt(data[serie.yValue], 10);
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
