import React, { Component } from 'react';
import styles from './styles'
import dateManager from '../../lib/dateManager';
import MainAndTwoSubDataBadge from './MainAndTwoSubDataBadge';

import Paper from 'material-ui/Paper';
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
        uri: props.uri
      }
      break;
      case 2:
      newState = {
        titleNow: props.title + ' de esta semana',
        titlePast: props.title + ' de la semana pasada a la misma fecha',
        uri: props.uri
      };
      break;
      case 3:
      newState = {
        titleNow: props.title + ' de este mes',
        titlePast: props.title + ' del mes pasado a la misma fecha',
        uri: props.uri
      };
      break;
      case 4:
      newState = {
        titleNow: props.title + ' de este año',
        titlePast: props.title + ' del año pasado a la misma fecha',
        uri: props.uri
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
    return (
      <div style={styles.comparisonContainer}>
      <DropDownMenu value={this.state.menuValue}
      onChange={this._handleChange}
      style= {{fontSize: '25px'}}
      >
      <MenuItem value={1} primaryText={"Comparación Diaria de " + this.props.title} style= {{fontSize: '20px'}}/>
      <MenuItem value={2} primaryText={"Comparación Semanal de " + this.props.title} style= {{fontSize: '20px'}}/>
      <MenuItem value={3} primaryText={"Comparación Mensual de " + this.props.title} style= {{fontSize: '20px'}}/>
      <MenuItem value={4} primaryText={"Comparación Anual de " + this.props.title} style= {{fontSize: '20px'}}/>
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
  }
}
