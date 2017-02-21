import React, { Component } from 'react';
import styles from './styles'
import dateManager from '../../lib/dateManager';
import MainAndTwoSubDataBadge from './MainAndTwoSubDataBadge';

import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export default class ComparisonBadge extends Component {
  constructor(props) {
    super(props);
    var _now = Date.now();
    this.state = {
      open: false,
      menuValue: 1,
      uri: props.uri,
      // firstReady: false,
      // secondReady: false,
      nowStartDate: dateManager.getYesterday(_now),
      nowEndDate: dateManager.getString(_now),
      pastStartDate: dateManager.getYesterday(dateManager.getLastWeek(_now)),
      pastEndDate: dateManager.getLastWeek(_now)
    }
  }

  componentWillReceiveProps(props) {
    var newState = {};
    switch (this.state.menuValue) {
      case 1:
      newState = {
        titleNow: props.title + ' de hoy',
        titlePast: props.title + ' del ' + dateManager.getDayOfWeek(Date.now()) + ' pasado',
      }
      break;
      case 2:
      newState = {
        titleNow: props.title + ' de esta semana',
        titlePast: props.title + ' de la semana pasada a la misma fecha',
      };
      break;
      case 3:
      newState = {
        titleNow: props.title + ' de este mes',
        titlePast: props.title + ' del mes pasado a la misma fecha',
      };
      break;
      case 4:
      newState = {
        titleNow: props.title + ' de este año',
        titlePast: props.title + ' del año pasado a la misma fecha',
      };
      break;
    }
    this.setState(newState);
  }

  componentDidMount() {
    this.setState({
      titleNow: this.props.title + ' de hoy',
      titlePast: this.props.title + ' del ' + dateManager.getDayOfWeek(Date.now()) + ' pasado',
    });
  }

  _handleChange = (event, index, value) => {
    var _now = Date.now();
    var newState = {};
    console.log(value);
    if(value === this.state.menuValue) return;
    switch (value) {
      case 1:
      newState = {
        titleNow: this.props.title + ' de hoy',
        titlePast: this.props.title + ' del ' + dateManager.getDayOfWeek(Date.now()) + ' pasado',
        menuValue: value,
        nowStartDate: dateManager.getYesterday(_now),
        nowEndDate: dateManager.getString(_now),
        pastStartDate: dateManager.getYesterday(dateManager.getLastWeek(_now)),
        pastEndDate: dateManager.getLastWeek(_now)
      }
      break;
      case 2:
      newState = {
        titleNow: this.props.title + ' de esta semana',
        titlePast: this.props.title + ' de la semana pasada a la misma fecha',
        menuValue: value,
        nowStartDate: dateManager.getWeekStart(_now),
        nowEndDate: dateManager.getString(_now),
        pastStartDate: dateManager.getWeekStart(dateManager.getLastWeek(_now)),
        pastEndDate: dateManager.getLastWeek(_now)
      };
      break;
      case 3:
      newState = {
        titleNow: this.props.title + ' de este mes',
        titlePast: this.props.title + ' del mes pasado a la misma fecha',
        menuValue: value,
        nowStartDate: dateManager.getMonthStart(_now),
        nowEndDate: dateManager.getString(_now),
        pastStartDate: dateManager.getMonthStart(dateManager.getLastMonth(_now)),
        pastEndDate: dateManager.getLastMonth(_now)
      };
      break;
      case 4:
      newState = {
        titleNow: this.props.title + ' de este año',
        titlePast: this.props.title + ' del año pasado a la misma fecha',
        menuValue: value,
        nowStartDate: dateManager.getYearStart(_now),
        nowEndDate: dateManager.getString(_now),
        pastStartDate: dateManager.getYearStart(dateManager.getLastYear(_now)),
        pastEndDate: dateManager.getLastYear(_now)
      };
      break;
    }
    this.setState(newState);
  }

  render() {
    // if(!this.state.firstReady || !this.state.secondReady) {
    //   return (
    //     <Paper style={Object.assign(styles.paperRow, styles.paperOne, styles.flexCenterEverything)} zDepth={2} >
    //     <CircularProgress size={80} thickness={5} />
    //     </Paper>
    //   )
    // }
    // else {
    return (
      <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', paddingTop: '20px'}}>
      <DropDownMenu value={this.state.menuValue}
      onChange={this._handleChange}
      style= {{fontSize: '25px'}}
      >
      <MenuItem value={1} primaryText="Comparación Diaria" style= {{fontSize: '20px'}}/>
      <MenuItem value={2} primaryText="Comparación Semanal" style= {{fontSize: '20px'}}/>
      <MenuItem value={3} primaryText="Comparación Mensual" style= {{fontSize: '20px'}}/>
      <MenuItem value={4} primaryText="Comparación Anual" style= {{fontSize: '20px'}}/>
      </DropDownMenu>

      <div style={{justifyContent:'space-around', flexDirection: 'row', display: 'flex'}}>
      <MainAndTwoSubDataBadge title={this.state.titleNow}
      uri={this.state.uri.replace(':start_date', this.state.nowStartDate).replace(':end_date', this.state.nowEndDate)}
      leftColor='#FFBAD2'
      rightColor='#7CD8EA'
      />
      <MainAndTwoSubDataBadge title={this.state.titlePast}
      uri={this.state.uri.replace(':start_date', this.state.pastStartDate).replace(':end_date', this.state.pastEndDate)}
      leftColor='#FFBAD2'
      rightColor='#7CD8EA'/>
      </div>
      </div>
    );
    // return (
    //   <Paper style={Object.assign(styles.paperRow, styles.paperOne, styles.flexCenterEverything)} zDepth={2} >
    //   <div style={Object.assign(styles.blockOneTwo, styles.flexCenterEverything)}>
    //   <p style={styles.title}>{this.state.titleNow}</p>
    //   <p style={styles.data}>{this.state.dataNow.totalValue}</p>
    //   <div style={styles.bottomRow}>
    //   <div style={Object.assign({backgroundColor: this.props.leftColor}, styles.blockOneTwo, styles.flexCenterEverything)}>
    //   {this.state.dataNow.subDataOneLabel}: {this.state.dataNow.subDataOneValue}
    //   </div>
    //   <div style={Object.assign({backgroundColor: this.props.rightColor}, styles.blockOneTwo, styles.flexCenterEverything)}>
    //   {this.state.dataNow.subDataTwoLabel}: {this.state.dataNow.subDataTwoValue}
    //   </div>
    //   </div>
    //   </div>
    //   <div style={{height: '100%', width: '2px', backgroundColor: '#E6E6E6'}} />
    //   <div style={Object.assign(styles.blockOneTwo, styles.flexCenterEverything)}>
    //   <p style={styles.title}>{this.state.titlePast}</p>
    //   <p style={styles.data}>{this.state.dataPast.totalValue}</p>
    //   <div style={styles.bottomRow}>
    //   <div style={Object.assign({backgroundColor: this.props.leftColor}, styles.blockOneTwo, styles.flexCenterEverything)}>
    //   {this.state.dataPast.subDataOneLabel}: {this.state.dataPast.subDataOneValue}
    //   </div>
    //   <div style={Object.assign({backgroundColor: this.props.rightColor}, styles.blockOneTwo, styles.flexCenterEverything)}>
    //   {this.state.dataPast.subDataTwoLabel}: {this.state.dataPast.subDataTwoValue}
    //   </div>
    //   </div>
    //   </div>
    //   </Paper>
    // );
    // }
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
  _getData(uri){
    var uris = [];
    uris.push(uri.replace(':start_date', this.state.nowStartDate).replace(':end_date', this.state.nowEndDate));
    uris.push(uri.replace(':start_date', this.state.pastStartDate).replace(':end_date', this.state.pastEndDate));
    var data;
    uris.map((uri, i) => {
      fetch(uri, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        var data = {};
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
        if(responseJson.length > 1){
          data = {
            totalValue: total_avg === '0.00' ? total_count : total_avg,
            subDataOneLabel: this._getLabel(labels[0]),
            subDataOneValue: avgs.length === 0 ? counts[0] : avgs[0],
            subDataTwoLabel: this._getLabel(labels[1]),
            subDataTwoValue: avgs.length === 0 ? counts[1] : avgs[1]
          }
        }

        i === 0 ? this.setState({dataNow: data}) : this.setState({dataPast: data});
        i === 0 ? this.setState({firstReady: true}) : this.setState({secondReady: true});
      });
    });
  }
}
