import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import styles from './styles'
import CircularProgress from 'material-ui/CircularProgress';
import colorLib from '../../lib/averageColor';
import ActionStarRate from 'material-ui/svg-icons/toggle/star';

export default class MainAndTwoSubDataBadge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false
    }
  }

  componentDidMount() {
    fetch(this.props.uri, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({data: responseJson});
      this.setState({ready: true});
    });
  }

  render() {
    if(!this.state.ready) {
      return (
        <Paper style={Object.assign(styles.paper, styles.paperThree, styles.flexCenterEverything)} zDepth={2} >
        <CircularProgress size={80} thickness={5} />
        </Paper>
      )
    }
    else {
      return (
        <Paper style={Object.assign(styles.paper, styles.paperThree, styles.flexCenterEverything)} zDepth={2} >
        <p style={styles.title}>{this.props.title}</p>
        {this.state.data.map((object, i) => (
          <div style={Object.assign(styles.rowThree, styles.flexCenterEverything)} key={i}>
          <div style={Object.assign(styles.leftBlockTwoThree, styles.flexCenterEverything)}>
          {object[this.props.labelKey]}
          </div>
          <div style={Object.assign({color: colorLib.getColor(parseFloat(object[this.props.valueKey]))}, styles.rightBlockOneThree, styles.flexCenterEverything)}>
          {parseFloat(object[this.props.valueKey]).toFixed(2)}
          <ActionStarRate color={colorLib.getColor(parseFloat(object[this.props.valueKey]))}/>
          </div>
          </div>
        ))}
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
