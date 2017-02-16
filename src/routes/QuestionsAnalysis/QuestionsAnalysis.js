import React, { Component } from 'react'
import CardControlled from '../../components/Cards/CardControlled.js';
import Avatar from 'material-ui/Avatar';
import ActionQuestion from 'material-ui/svg-icons/action/question-answer';
import CircularProgress from 'material-ui/CircularProgress';
import CircularProgressStyle from '../../styles/CircularProgress';

var translator = {
  'number': 'estrellas',
  'options': 'opciones',
  'text': 'texto',
  'boolean': 'sí o no'
}

var uriGetter = {
  'number':  '/average_stars',
  'options':  '/options_answers',
  'text':  '/text_answers',
  'boolean': '/boolean_answers',
}


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
    fetch('http://www.localhost:3000/company/1/question', {
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
        {this.state.data.map((value, i) => {
          var uris = {
            total: 'http://www.localhost:3000/company/1/question/' + value.id + '/total_responses',
            age: 'http://www.localhost:3000/company/1/question/' + value.id + '/respondents_age',
            gender: 'http://www.localhost:3000/company/1/question/' + value.id + '/respondents_gender',
          };
          uris[value.type] = 'http://www.localhost:3000/company/1/question/' + value.id + uriGetter[value.type];
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
