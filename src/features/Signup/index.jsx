// @flow
import React, { PureComponent } from 'react';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signup } from './actions';
import { withRouter } from 'react-router-dom';
import getOr from 'lodash/fp/getOr';

const referrerRedirect = props => {
  const referrer = getOr('/', 'location.state.from.pathname', props);
  props.history.push(referrer);
};

class SignUp extends PureComponent {
  componentWillMount() {
    if (localStorage.getItem('user')) referrerRedirect(this.props);
  }
  componentWillUpdate(nextProps) {
    if (localStorage.getItem('user')) referrerRedirect(nextProps);
  }
  handleSignUpClick = e => {
    e.preventDefault();
    const { email, password, passwordConfirm, firstName, lastName } = this.refs;
    this.props.signup({
      email: email.value,
      password: password.value,
      passwordConfirm: passwordConfirm.value,
      firstName: firstName.value,
      lastName: lastName.value
    });
  };
  render() {
    return (
      <form onSubmit={this.handleSignUpClick}>
        <div>
          <label htmlFor="firstName">First name</label>
          <input type="text" name="firstName" ref="firstName" />
        </div>
        <div>
          <label htmlFor="lastName">Last name</label>
          <input type="text" name="lastName" ref="lastName" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" ref="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" ref="password" />
        </div>
        <div>
          <label htmlFor="password-repeat">Confirm Password</label>
          <input
            type="password"
            name="password-confirm"
            ref="passwordConfirm"
          />
        </div>
        <input type="submit" value="SignUp" />
      </form>
    );
  }
}

const mapStateToProps = state => ({ ...state.signup });

export default connect(mapStateToProps, {
  signup
})(withRouter(SignUp));
