import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import 'antd/dist/antd.css';
import './App.scss';

import Home from "./screens/Home"
import Register from "./screens/Register"
import Login from "./screens/Login"
import Edit from './screens/Edit'
import Add from './screens/Add'
import NotFound from './screens/NotFound'

function App() {

  const history = useHistory();

  const isAuthenticated = localStorage.getItem('isAuthenticated');

  if (isAuthenticated!=='true') {
    history.push('/login');
  }

  return (
    <div className="app">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route exact path="/" component={Home} />
        <Route exact path="/edit/:id" component={Edit} />
        <Route exact path="/add" component={Add} />

        <Route component={NotFound}/>
      </Switch>
    </div>
  );
}

export default App;
