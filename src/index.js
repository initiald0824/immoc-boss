import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import reducers from './reducer';
import { rootSaga } from './rootSaga';
import './config';
import Login from './container/login/login';
import Register from './container/register/register';
import BossInfo from './container/bossInfo/bossInfo';
import GeniusInfo from './container/geniusInfo/geniusInfo';
import AuthRoute from '@component/authRoute/authRoute';
import './index.css';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers,
  compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f=>f
  )
);

sagaMiddleware.run(rootSaga);


ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute />
        <Route path='/bossInfo' component={BossInfo} />
        <Route path='/geniusInfo' component={GeniusInfo} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
