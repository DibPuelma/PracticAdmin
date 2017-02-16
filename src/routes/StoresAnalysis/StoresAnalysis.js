import React, { Component } from 'react'
import CardControlled from '../../components/Cards/CardControlled.js';
import Avatar from 'material-ui/Avatar';
import ActionHome from 'material-ui/svg-icons/action/home';
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
    fetch('http://www.localhost:3000/company/1/sell_point', {
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
      //TODO: Centrar el loader
      return(
        <CircularProgress style={CircularProgressStyle} size={80} thickness={5} />
      )
    }
    else {
      return (
        <div>
        {this.state.data.map((value, i) => (
          <CardControlled
          uris={{
            total: 'http://www.localhost:3000/company/1/sell_point/' + value.id + '/total_responses',
            age: 'http://www.localhost:3000/company/1/sell_point/' + value.id + '/respondents_age',
            gender: 'http://www.localhost:3000/company/1/sell_point/' + value.id + '/respondents_gender',
            number: 'http://www.localhost:3000/company/1/sell_point/' + value.id + '/average_stars'
          }}
          expand={(id, toggle) => (this._expandListElement(id, toggle))}
          type='tienda'
          diff={value.id}
          title="Local"
          subtitle={value.location}
          avatar={<Avatar icon={<ActionHome />}/>}
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
