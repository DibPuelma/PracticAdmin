import React, { Component } from 'react'
import CardControlled from '../../components/Cards/CardControlled.js';
import Avatar from 'material-ui/Avatar';
import SocialPoll from 'material-ui/svg-icons/social/poll';
import CircularProgress from 'material-ui/CircularProgress';
import CircularProgressStyle from '../../styles/CircularProgress';


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
    fetch('http://www.localhost:3000/company/1/poll', {
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
        {this.state.data.map((value, i) => (
          <CardControlled
          title={value.name}
          subtitle={value.description}
          avatar={<Avatar icon={<SocialPoll />}/>}
          uris={{
            total: 'http://www.localhost:3000/company/1/poll/' + value.id + '/total_responses',
            age: 'http://www.localhost:3000/company/1/poll/' + value.id + '/respondents_age',
            gender: 'http://www.localhost:3000/company/1/poll/' + value.id + '/respondents_gender',
            number: 'http://www.localhost:3000/company/1/poll/' + value.id + '/average_stars'
          }}
          expand={(id, toggle) => (this._expandListElement(id, toggle))}
          type='encuesta'
          diff={value.id}
          key={i}
          ref={value.id}/>
        ))}
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
