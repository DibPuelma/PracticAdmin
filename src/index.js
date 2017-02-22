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
import EmployeesAnalysis from './routes/EmployeesAnalysis/EmployeesAnalysis.js';

import Polls from './routes/Polls/Polls';
import Questions from './routes/Questions/Questions';
import OptionsContainers from './routes/OptionsContainers/OptionsContainers';
import Employees from './routes/Employees/Employees';

export default class NotImplemented extends Component {
  render() {
    return (
      <div>
        <h2>Característica aún no implementada</h2>
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
      <Route path="analisis_tiendas" component={StoresAnalysis} />
      <Route path="analisis_empleados" component={EmployeesAnalysis} />
      <Route path="analisis_encuestas" component={PollsAnalysis} />
      <Route path="analisis_preguntas" component={QuestionsAnalysis} />
      <Route path="analisis_avanzado" component={NotImplemented} />
      <Route path="dashboard" component={Dashboard} />
      {
        //<Route path="analisis_compania" component={CompanyAnalysis} />
      }

      { /* Admin */ }
      <Route path="encuestas" component={Polls} user={ _getUser } />
      <Route path="preguntas" component={Questions} user={ user } />
      <Route path="opciones" component={OptionsContainers} user={ user } />
      <Route path="empleados" component={Employees} user={ user } />
    </Route>

  </Router>
  ,document.getElementById('root')
);
