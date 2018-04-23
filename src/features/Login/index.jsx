import React, { PureComponent } from 'react';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from './actions';

class Login extends PureComponent {
  handleLoginClick = e => {
    e.preventDefault();
    const { email, password } = this.refs;
    this.props.login(email.value, password.value);
  };
  render() {
    return (
      <div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" ref="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" ref="password" />
        </div>
        <button onClick={this.handleLoginClick}>Login</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  login: state.login
});

export default connect(mapStateToProps, {
  login
})(Login);
