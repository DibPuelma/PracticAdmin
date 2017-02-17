import React, { Component } from 'react'
import CardControlled from '../../components/Cards/CardControlled.js';
import Avatar from 'material-ui/Avatar';
import SocialPoll from 'material-ui/svg-icons/social/poll';
import CircularProgress from 'material-ui/CircularProgress';
import CircularProgressStyle from '../../styles/CircularProgress';
import settings from '../../config/settings';

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
    fetch(settings.POLLS.replace(':company_id', 1), {
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
            total: settings.POLL_TOTAL.replace(':company_id', 1).replace(':poll_id', value.id),
            age: settings.POLL_AGE.replace(':company_id', 1).replace(':poll_id', value.id),
            gender: settings.POLL_GENDER.replace(':company_id', 1).replace(':poll_id', value.id),
            number: settings.POLL_AVG.replace(':company_id', 1).replace(':poll_id', value.id)
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
