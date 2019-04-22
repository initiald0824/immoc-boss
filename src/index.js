import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { rootSaga } from "./index.redux";
import Auth from './Auth.js';
import Dashboard from './Dashboard.js';
import reducers from './reducer.js';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';


const sagaMiddleware = createSagaMiddleware();
const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : ()=>{};
const store = createStore(reducers, compose(
  applyMiddleware(sagaMiddleware),
  reduxDevtools
));

sagaMiddleware.run(rootSaga);

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Auth} />
        <Route path='/dashboard' component={Dashboard} />
        <Redirect to='/dashboard' />
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));


