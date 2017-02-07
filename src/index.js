import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import './index.css';


import App from './App';
import HomeApp from './HomeApp';

import Home from './routes/Home/Home.js';
import Login from './routes/Login/Login.js';
import Panel from './routes/Panel/Panel.js';
import DumbExcel from './routes/DumbExcel/DumbExcel.js';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={HomeApp}>
      <IndexRoute component={Home} />
      <Route path="entrar" component={Login} />
      <Route path="descargas" component={DumbExcel} />
    </Route>

    <Route path="/" component={App}>
      <Route path="panel" component={Panel} />
    </Route>

  </Router>
  ,document.getElementById('root')
);
