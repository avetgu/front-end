import React, { Component } from 'react';
import Layout from '../../components/Layout/Layout';
import { Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import s from './container.css';
// import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();
class Container extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <Layout isAuthenticated={isAuthenticated}>
        <div className={s.wrap}>{this.props.children}</div>
      </Layout>
    );
  }
}
export default connect(state => state)(Container);
