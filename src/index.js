import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import './index.css';

import App from './App';
import HomeApp from './HomeApp';

import Home from './routes/Home/Home.js';
import Panel from './routes/Panel/Panel.js';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={HomeApp}>
      <IndexRoute component={Home} />
    </Route>
    
    <Route path="/" component={App}>
      <Route path="panel" component={Panel} />
    </Route>
  </Router>
  ,document.getElementById('root')
);
