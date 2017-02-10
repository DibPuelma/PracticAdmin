import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import './index.css';
import './nv.d3.min.css';

import App from './App';
import HomeApp from './HomeApp';

import Home from './routes/Home/Home.js';
import Panel from './routes/Panel/Panel.js';
import DumbExcel from './routes/DumbExcel/DumbExcel.js';
import Dashboard from './routes/Dashboard/Dashboard.js';
import Stores from './routes/Stores/Stores.js';
import Polls from './routes/Polls/Polls.js';

export default class Abc extends Component {
  render() {
    return (
      <div>
        <h2>Abc - ruta de ejemplo</h2>
      </div>
    );
  }
}


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={HomeApp}>
      <IndexRoute component={Home} />
      <Route path="descargas" component={DumbExcel} />
    </Route>

    <Route path="/" component={App}>
      <Route path="panel" component={Panel} />
      <Route path="stores" component={Stores} />
      <Route path="polls" component={Polls} />
      <Route path="dashboard" component={Dashboard} />
    </Route>

  </Router>
  ,document.getElementById('root')
);
