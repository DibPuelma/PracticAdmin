import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import styles from './styles'
import CircularProgress from 'material-ui/CircularProgress';

export default class MainAndTwoSubDataBadge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false
    }
  }

  componentDidMount() {
    console.log(this.props.uri);
    fetch(this.props.uri, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      var labels = [];
      var counts = [];
      var avgs = [];
      var sum = 0;
      var total_count = 0;
      var total_avg = 0;
      responseJson.map((object) => {
        if (object.hasOwnProperty('gender')) {
          labels.push(object.gender);
        }
        if (object.hasOwnProperty('count')) {
          total_count += parseInt(object.count, 10);
          counts.push(object.count);
        }
        if (object.hasOwnProperty('avg')) {
          avgs.push(parseFloat(object.avg).toFixed(2));
        }
        if (object.hasOwnProperty('avg') && object.hasOwnProperty('count')) {
          sum += parseFloat(object.avg).toFixed(2) * parseInt(object.count, 10);
        }
      })
      total_avg = (sum/total_count).toFixed(2);
      var newData = {
        totalValue: total_avg === '0.00' ? total_count : total_avg,
        subDataOneLabel: this._getLabel(labels[0]),
        subDataOneValue: avgs.length === 0 ? counts[0] : avgs[0],
        subDataTwoLabel: this._getLabel(labels[1]),
        subDataTwoValue: avgs.length === 0 ? counts[1] : avgs[1]
      }
      this.setState({data: newData});
      this.setState({ready: true});
    });
  }

  render() {
    if(!this.state.ready) {
      return (
        <Paper style={Object.assign(styles.paper, styles.paperFour, styles.flexCenterEverything)} zDepth={2} >
        <CircularProgress size={80} thickness={5} />
        </Paper>
      )
    }
    else {
      return (
        <Paper style={Object.assign(styles.paper, styles.paperFour, styles.flexCenterEverything)} zDepth={2} >
        <p style={styles.title}>{this.props.title}</p>
        <p style={styles.data}>{this.state.data.totalValue}</p>
        <div style={styles.bottomRow}>
        <div style={Object.assign({backgroundColor: this.props.leftColor}, styles.blockOneTwo, styles.flexCenterEverything)}>
        {this.state.data.subDataOneLabel}: {this.state.data.subDataOneValue}
        </div>
        <div style={Object.assign({backgroundColor: this.props.rightColor}, styles.blockOneTwo, styles.flexCenterEverything)}>
        {this.state.data.subDataTwoLabel}: {this.state.data.subDataTwoValue}
        </div>
        </div>
        </Paper>
      );
    }
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
