import React from 'react';
import { Link, Route } from "react-router-dom";
import App from './App.js';

function Second() {
  return <h2>二营</h2>;
}

function Knight() {
  return <h2>骑兵连</h2>
}

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to='/dashboard'>一营</Link>
          </li>
          <li>
            <Link to='/dashboard/second'>二营</Link>
          </li>
          <li>
            <Link to='/dashboard/knight'>骑兵连</Link>
          </li>
        </ul>
        <Route exact path='/dashboard' component={App} />
        <Route path='/dashboard/second' component={Second} />
        <Route path='/dashboard/knight' component={Knight} />
      </div>
    )
  }
}

export default Dashboard;
