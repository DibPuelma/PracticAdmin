import React, { Component } from 'react'
import CardControlled from '../../components/Cards/CardControlled.js';
import Avatar from 'material-ui/Avatar';
import ActionHome from 'material-ui/svg-icons/action/home';

export default class Panel extends Component {
  constructor(props){
    super(props);
    this.state = {
      ready: false
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
      return(
        <h1> CARGANDO </h1>
      )
    }
    else {
      return (
        <div>
        {this.state.data.map((value, i) => (
          <CardControlled
          title="Local"
          subtitle={value.location}
          avatar={<Avatar icon={<ActionHome />}/>}
          key={i}/>
        ))}
        </div>
      );
    }
  }
}
