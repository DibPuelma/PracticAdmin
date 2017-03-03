import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import './index.css';
import './nv.d3.min.css';
import cookie from 'react-cookie';

import App from './App';
import HomeApp from './HomeApp';

import Home from './routes/Home/Home.js';
import DumbExcel from './routes/DumbExcel/DumbExcel.js';
import Dashboard from './routes/Dashboard/Dashboard.js';
import StoresAnalysis from './routes/StoresAnalysis/StoresAnalysis.js';
import PollsAnalysis from './routes/PollsAnalysis/PollsAnalysis.js';
import QuestionsAnalysis from './routes/QuestionsAnalysis/QuestionsAnalysis.js';
import EmployeesAnalysis from './routes/EmployeesAnalysis/EmployeesAnalysis.js';

import SellPoints from './routes/SellPoints/SellPoints';
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

class Application extends Component {
  constructor(props) {
    super(props);
    
    var user = cookie.load('user');
    if (user !== null) {
      this.state = { user: user, leaving: false };
    } else {
      this.state = {};
    }
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={HomeApp}>
          <IndexRoute component={Home} onLogin={ this._login } />
          <Route path="descargas" component={DumbExcel} />
        </Route>

        <div>Hola</div>
        <Route path="/" component={App} getUser={ this._getUser } logout={ this._logout } onEnter={ this.requireAuth }>
          { /* Análisis */ }
          <Route path="analisis_tiendas" component={StoresAnalysis} getUser={ this._getUser } />
          <Route path="analisis_empleados" component={EmployeesAnalysis} getUser={ this._getUser } />
          <Route path="analisis_encuestas" component={PollsAnalysis} getUser={ this._getUser } />
          <Route path="analisis_preguntas" component={QuestionsAnalysis} getUser={ this._getUser } />
          <Route path="analisis_avanzado" component={NotImplemented} getUser={ this._getUser } />
          <Route path="dashboard" component={Dashboard} />
          { /* <Route path="analisis_compania" component={CompanyAnalysis} /> */ }

          { /* Admin */ }
          <Route path="locales" component={SellPoints} getUser={ this._getUser }/>
          <Route path="encuestas" component={Polls} getUser={ this._getUser }/>
          <Route path="preguntas" component={Questions} getUser={ this._getUser } />
          <Route path="opciones" component={OptionsContainers} getUser={ this._getUser } />
          <Route path="empleados" component={Employees} getUser={ this._getUser } />
        </Route>
      </Router>
    );
  }
  
  requireAuth = (nextState, replace) => {
    var user = this.state.user;
    if (typeof user === 'undefined') {
      replace({ pathname: '/', state: { } });
    }
  }

  _getUser = () => {
    return(this.state.user);
  }

  _login = (user) => {
    cookie.save('user', JSON.stringify(user), { path: '/' });
    this.setState({ user: user });
  }

  _logout = () => {
    cookie.remove('user', { path: '/' });
  }
}

ReactDOM.render(
  <Application />
  ,document.getElementById('root')
);
