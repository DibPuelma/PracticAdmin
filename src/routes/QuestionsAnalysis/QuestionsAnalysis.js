import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar';
import ActionQuestion from 'material-ui/svg-icons/action/question-answer';
import CircularProgress from 'material-ui/CircularProgress';
import CircularProgressStyle from '../../styles/CircularProgress';

import settings from '../../config/settings';

import CardControlled from '../../components/Cards/CardControlled.js';
import ExcelDownloadButton from '../../components/Buttons/ExcelDownloadButton';


var translator = {
  'number': 'estrellas',
  'options': 'opciones',
  'text': 'texto',
  'boolean': 'sí o no'
}

var uriGetter = {
  'number':  settings.QUESTION_AVG,
  'options':  settings.QUESTION_OPTIONS,
  'text':  settings.QUESTION_TEXT,
  'boolean': settings.QUESTION_BOOLEAN
}


export default class Panel extends Component {
  constructor(props){
    super(props);
    this.state = {
      ready         : false,
      expanded      : null,
      doubleExpanded: false,
      user          : this.props.route.getUser()
    }
  }

  componentDidMount() {
    fetch(settings.QUESTIONS.replace(':company_id', this.state.user.company_id), {
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
        uri={settings.EXCEL_QUESTIONS.replace(':company_id', this.state.user.company_id)}
        fileName='reporte_preguntas.xlsx'
        label='Descargar excel con los datos de las preguntas'
        />
        {this.state.data.map((value, i) => {
          var uris = {
            total           : settings.QUESTION_TOTAL.replace(':company_id',           this.state.user.company_id).replace(':question_id', value.id),
            age             : settings.QUESTION_AGE.replace(':company_id',             this.state.user.company_id).replace(':question_id', value.id),
            gender          : settings.QUESTION_GENDER.replace(':company_id',          this.state.user.company_id).replace(':question_id', value.id),
            avg_age         : settings.QUESTION_AVG_AGE.replace(':company_id',         this.state.user.company_id).replace(':question_id', value.id),
            number_by_gender: settings.QUESTION_AVG_BY_GENDER.replace(':company_id',   this.state.user.company_id).replace(':question_id', value.id),
            total_by_gender : settings.QUESTION_TOTAL_BY_GENDER.replace(':company_id', this.state.user.company_id).replace(':question_id', value.id),
          };
          uris[value.type] = uriGetter[value.type].replace(':company_id', this.state.user.company_id).replace(':question_id', value.id);
          return (
            <CardControlled
            expand={(id, toggle) => (this._expandListElement(id, toggle))}
            title={value.text}
            subtitle={'Tipo: ' + translator[value.type]}
            avatar={<Avatar icon={<ActionQuestion />}/>}
            uris={uris}
            type='pregunta'
            diff={value.id}
            key={i}
            ref={value.id}/>
          )
        })
      }
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
      this.setState({expanded: id}, () => {
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
