import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import './index.css';
import './nv.d3.min.css';

import App from './App';
import HomeApp from './HomeApp';

import Home from './routes/Home/Home.js';
import DumbExcel from './routes/DumbExcel/DumbExcel.js';
import Dashboard from './routes/Dashboard/Dashboard.js';
import StoresAnalysis from './routes/StoresAnalysis/StoresAnalysis.js';
import PollsAnalysis from './routes/PollsAnalysis/PollsAnalysis.js';
import QuestionsAnalysis from './routes/QuestionsAnalysis/QuestionsAnalysis.js';
import CompanyAnalysis from './routes/CompanyAnalysis/CompanyAnalysis.js';

import Polls from './routes/Polls/Polls';
import Questions from './routes/Questions/Questions';
import OptionsContainers from './routes/OptionsContainers/OptionsContainers';
import Employees from './routes/Employees/Employees';

export default class Abc extends Component {
  render() {
    return (
      <div>
        <h2>Está característica se implementará en el futuro</h2>
      </div>
    );
  }
}

var user = null;
console.log("???");
function _login(u) {
  user = u;
  console.log(user);
}

function _getUser() {
  return user;
}

ReactDOM.render(
  <Router history={browserHistory}>
    {console.log("hola")}
    <Route path="/" component={HomeApp}>
      <IndexRoute component={Home} onLogin={ _login } />
      <Route path="descargas" component={DumbExcel} />
    </Route>

    <Route path="/" component={App}>
      { /* Análisis */ }
      <Route path="analisis_tiendas" component={StoresAnalysis} user={ user }/>
      <Route path="analisis_encuestas" component={PollsAnalysis} user={ user } />
      <Route path="analisis_preguntas" component={QuestionsAnalysis} user={ user } />
      <Route path="analisis_compania" component={CompanyAnalysis} user={ user } />
      <Route path="analisis_avanzado" component={Abc} user={ user } />
      <Route path="dashboard" component={Dashboard} user={ user }/>

      { /* Admin */ }
      <Route path="encuestas" component={Polls} user={ _getUser } />
      <Route path="preguntas" component={Questions} user={ user } />
      <Route path="opciones" component={OptionsContainers} user={ user } />
      <Route path="empleados" component={Employees} user={ user } />
    </Route>

  </Router>
  ,document.getElementById('root')
);
