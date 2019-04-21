import React from 'react';
import { connect } from 'react-redux';

@connect(state => state)
class Auth extends React.Component {
  render() {
    return <h2>Auth page</h2>
  }
}

export default Auth;
