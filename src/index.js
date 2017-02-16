import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import './index.css';

import App from './App';
import HomeApp from './HomeApp';

import Home from './routes/Home/Home.js';
import Panel from './routes/Panel/Panel.js';

import Polls from './routes/Polls/Polls';
import Questions from './routes/Questions/Questions';
import OptionsContainers from './routes/OptionsContainers/OptionsContainers';
import Employees from './routes/Employees/Employees';

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
    </Route>
    
    <Route path="/" component={App}>
      <Route path="panel" component={Panel} />
      <Route path="abc" component={Abc} />

      { /* Admin */ }
      <Route path="encuestas" component={Polls} />

      <Route path="preguntas" component={Questions} />
      <Route path="opciones" component={OptionsContainers} />
      <Route path="empleados" component={Employees} />
    </Route>
  </Router>
  ,document.getElementById('root')
);
