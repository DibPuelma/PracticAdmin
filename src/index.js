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
import StoresAnalysis from './routes/StoresAnalysis/StoresAnalysis.js';
import PollsAnalysis from './routes/PollsAnalysis/PollsAnalysis.js';
import QuestionsAnalysis from './routes/QuestionsAnalysis/QuestionsAnalysis.js';
import EmployeesAnalysis from './routes/EmployeesAnalysis/EmployeesAnalysis.js';
import CompanyAnalysis from './routes/CompanyAnalysis/CompanyAnalysis.js';

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
      <Route path="analisis_tiendas" component={StoresAnalysis} />
      <Route path="analisis_empleados" component={EmployeesAnalysis} />
      <Route path="analisis_encuestas" component={PollsAnalysis} />
      <Route path="analisis_preguntas" component={QuestionsAnalysis} />
      <Route path="analisis_compania" component={CompanyAnalysis} />
      <Route path="dashboard" component={Dashboard} />
    </Route>

  </Router>
  ,document.getElementById('root')
);
