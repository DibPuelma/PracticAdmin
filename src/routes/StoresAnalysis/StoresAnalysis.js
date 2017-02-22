import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar';
import ActionHome from 'material-ui/svg-icons/action/home';
import CircularProgress from 'material-ui/CircularProgress';
import CircularProgressStyle from '../../styles/CircularProgress';

import settings from '../../config/settings';

import CardControlled from '../../components/Cards/CardControlled.js';
import ExcelDownloadButton from '../../components/Buttons/ExcelDownloadButton';

export default class Panel extends Component {
  constructor(props){
    super(props);
    this.state = {
      ready: false,
      expanded: null,
      doubleExpanded: false
    }
  }

  componentDidMount() {
    fetch(settings.STORES.replace(':company_id', 1), {
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
      return(
        <CircularProgress style={CircularProgressStyle} size={80} thickness={5} />
      )
    }
    else {
      return (
        <div>
        <ExcelDownloadButton
        uri={settings.EXCEL_STORES.replace(':company_id', 1)}
        fileName='reporte_locales.xlsx'
        label='Descargar excel con los datos de los locales'
        />
        {this.state.data.map((value, i) => (
            <CardControlled
            uris={{
              total: settings.STORE_TOTAL.replace(':company_id', 1).replace(':sell_point_id', value.id),
              age: settings.STORE_AGE.replace(':company_id', 1).replace(':sell_point_id', value.id),
              gender: settings.STORE_GENDER.replace(':company_id', 1).replace(':sell_point_id', value.id),
              number: settings.STORE_AVG.replace(':company_id', 1).replace(':sell_point_id', value.id),
              avg_age: settings.STORE_AVG_AGE.replace(':company_id', 1).replace(':sell_point_id', value.id),
              number_by_gender: settings.STORE_AVG_BY_GENDER.replace(':company_id', 1).replace(':sell_point_id', value.id),
              total_by_gender: settings.STORE_TOTAL_BY_GENDER.replace(':company_id', 1).replace(':sell_point_id', value.id),
            }}
            expand={(id, toggle) => (this._expandListElement(id, toggle))}
            type='tienda'
            diff={value.id}
            title={value.location}
            subtitle="Local"
            avatar={<Avatar icon={<ActionHome />}/>}
            key={i}
            ref={value.id}/>
          )
        )}
        </div>
      );
    }
  }
  _expandListElement = function(id, toggle) {
    if (toggle) {
      if(this.state.expanded === null){
        this.setState({expanded: id})
      }
      else{
        var ref = this.state.expanded;
        this.setState({doubleExpanded: true})
        this.setState({expanded: id}, () => {
          console.log(this);
          this.refs[ref].handleToggle(null, false);
        })
      }
    }
    else {
      if(this.state.doubleExpanded){
        this.setState({doubleExpanded: false})
      }
      else {
        this.setState({expanded: null})
      }
    }
  }
}
