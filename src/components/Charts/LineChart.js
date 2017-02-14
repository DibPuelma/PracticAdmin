import React, { Component } from 'react';
import * as d3 from 'd3';
import nvd3 from 'nvd3';
import CircularProgress from 'material-ui/CircularProgress';

//TODO: Arreglar gráfico de count. agregarle mínimo y máximo valor
//TODO: No se llama a did mount siempre. Por eso no funcionan los botones.
export default class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false
    }
  }

  componentDidMount() {
    console.log("did mount");
    this._getDataAndCreateGraph(this.props.uri);
  }

  render(){
    if(!this.state.ready) {
      return (
        <CircularProgress/>
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
      chart = nvd3.models.lineChart()
      .options(options);
      // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
      chart.xAxis
      .axisLabel(xAxisLabel)
      .tickFormat(function(d) {
        return xType === 'time' ? d3.time.format(xFormat)(new Date(d)) : d3.format(xFormat)(d);
      })
      .rotateLabels(-45)
      .showMaxMin(false);
      chart.yAxis
      .axisLabel(yAxisLabel)
      .tickFormat(function(d) {
        if (d == null) {
          return 'N/A';
        }
        return d3.format(yFormat)(d);
      })
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
        responseJson.map((data, i) => {
          var yValue = data[serie.yValue];
          var xValue = this.props.xType === 'time' ? new Date(data[this.props.xValue]).getTime() : data[this.props.xValue];
          serie.values.push({x: xValue, y: yValue});
        });
      });
      var data = [];
      this.props.series.map((serie, i) => {
        data.push({
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
