import React from 'react';
import ReactDom from 'react-dom';
import App from './App.js';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { counter, rootSaga } from "./index.redux";

import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom';


const sagaMiddleware = createSagaMiddleware();
const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : ()=>{};
const store = createStore(counter, compose(
  applyMiddleware(sagaMiddleware),
  reduxDevtools
));

sagaMiddleware.run(rootSaga);

function Second() {
  return <h2>二营</h2>
}

function Knight() {
  return <h2>骑兵连</h2>
}

class Test extends React.Component {
  render() {
    return <h2>测试组件{this.props.match.params.location}</h2>
  }
}


ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/second' component={Second} />
        <Route path='/knight' component={Knight} />
        <Route path='/:location' component={Test} />
      </Switch>
      <div>
        <ul>
          <li>
            <Link to='/'>一营</Link>
          </li>
          <li>
            <Link to='/second'>二营</Link>
          </li>
          <li>
            <Link to='/knight'>骑兵连</Link>
          </li>
        </ul>
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));


