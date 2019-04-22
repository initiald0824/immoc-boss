import React from 'react';
import { Link, Route, Redirect } from "react-router-dom";
import App from './App.js';
import { connect } from 'react-redux';
import { logout } from './Auth.redux';

function Second() {
  return <h2>二营</h2>;
}

function Knight() {
  return <h2>骑兵连</h2>
}

@connect(
  state => state.auth,
  {logout}
)
class Dashboard extends React.Component {
  render() {
    const match = this.props.match;
    const redirectToLogin = <Redirect to='/login' />;
    const app = (
      <div>
        <h1>独立团</h1>
        {this.props.isAuth ? <button onClick={this.props.logout}>注销</button> : null}
        <ul>
          <li>
            <Link to={`${match.url}`}>一营</Link>
          </li>
          <li>
            <Link to={`${match.url}/second`}>二营</Link>
          </li>
          <li>
            <Link to={`${match.url}/knight`}>骑兵连</Link>
          </li>
        </ul>
        <Route exact path={`${match.url}`} component={App} />
        <Route path={`${match.url}/second`} component={Second} />
        <Route path={`${match.url}/knight`} component={Knight} />
      </div>
    );
    return this.props.isAuth ? app : redirectToLogin;
  }
}

export default Dashboard;
