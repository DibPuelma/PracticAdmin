import React, { Component } from 'react'
import CardControlled from '../../components/Cards/CardControlled.js';
import Avatar from 'material-ui/Avatar';
import ActionHome from 'material-ui/svg-icons/action/home';
import CircularProgress from 'material-ui/CircularProgress';

var translator = {
  'number': 'estrellas',
  'options': 'opciones',
  'text': 'texto',
  'boolean': 'sí o no'
}
export default class Panel extends Component {
  constructor(props){
    super(props);
    this.state = {
      ready: false
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
        <CircularProgress/>
      )
    }
    else {
      return (
        <div>
        {this.state.data.map((value, i) => (
          <CardControlled
          title={value.text}
          subtitle={'Tipo: ' + translator[value.type]}
          avatar={<Avatar icon={<ActionHome />}/>}
          uris={{
            avg: 'http://www.localhost:3000/company/1/question/' + value.id + '/average_stars',
            total: 'http://www.localhost:3000/company/1/question/' + value.id + '/total_responses',
            age: 'http://www.localhost:3000/company/1/question/' + value.id + '/respondents_age',
            gender: 'http://www.localhost:3000/company/1/question/' + value.id + '/respondents_gender',
          }}
          type='pregunta'
          diff= {i}
          key={i}/>
        ))}
        </div>
      );
    }
  }
}
