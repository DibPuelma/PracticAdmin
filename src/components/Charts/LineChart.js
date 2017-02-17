import React, { Component } from 'react';
import * as d3 from 'd3';
import nvd3 from 'nvd3';
import CircularProgress from 'material-ui/CircularProgress';
import CircularProgressStyle from '../../styles/CircularProgress';

//TODO: Arreglar gráfico de count. agregarle mínimo y máximo valor
export default class LineChart extends Component {
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

    nvd3.addGraph(() => {
      chart = nvd3.models.lineWithFocusChart()
      .options(options)
      .noData("Aún no hay respuestas o lo que pides no existe")
      // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
      chart.xAxis
      .tickFormat(function(d) {
        return xType === 'time' ? d3.time.format(xFormat)(new Date(d)) : d3.format(xFormat)(d);
      })

      chart.yAxis
      .axisLabel(yAxisLabel)
      .tickFormat(function(d) {
        if (d == null) {
          return 'N/A';
        }
        return d3.format(yFormat)(d);
      })

      chart.x2Axis
      .rotateLabels(-45)
      .tickFormat(function(d) {
        return xType === 'time' ? d3.time.format(xFormat)(new Date(d)) : d3.format(xFormat)(d);
      })

      chart.lines.dispatch.on("elementClick", function(e) {
        console.log(e);
      });
      d3.select('#' + id)
      .attr('display', 'inline')
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
        serie.values = []
        return responseJson.map((data, i) => {
          var yValue = data[serie.yValue];
          var xValue = this.props.xType === 'time' ? new Date(data[this.props.xValue]).getTime() : data[this.props.xValue];
          return serie.values.push({x: xValue, y: yValue});
        });
      });
      var data = [];
      this.props.series.map((serie, i) => {
        return data.push({
          values: serie.values,
          key: serie.key,
          color: serie.color
        })
      });

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
