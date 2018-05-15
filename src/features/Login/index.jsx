// @flow
import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import getOr from 'lodash/fp/getOr';

import { requestLogin } from './actions';

const referrerRedirect = props => {
  const referrer = getOr('/', 'location.state.from.pathname', props);
  props.history.push(referrer);
};

class Login extends PureComponent {
  componentWillMount() {
    if (localStorage.getItem('user')) referrerRedirect(this.props);
  }
  componentWillUpdate(nextProps) {
    if (localStorage.getItem('user')) referrerRedirect(nextProps);
  }
  handleLoginClick = e => {
    e.preventDefault();
    const { email, password } = this.refs;
    this.props.requestLogin(email.value, password.value);
  };
  render() {
    console.log(this.props);
    return (
      <form onSubmit={this.handleLoginClick}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" ref="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" ref="password" />
        </div>
        <input type="submit" value="Login" />
      </form>
    );
  }
}

const mapStateToProps = state => ({ login: state.login });

export default connect(mapStateToProps, {
  requestLogin
})(withRouter(Login));
