// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { requestSignup } from './actions';
import SignupForm from './signupForm';

class SignUp extends PureComponent {
  static propTypes = {
    requestSignup: PropTypes.func.isRequired,
    signupRequestSuccess: PropTypes.bool
  };

  static defaultProps = {
    signupRequestSuccess: false
  };

  render() {
    console.log(this.props);
    const content = this.props.signupRequestSuccess ? (
      <div>
        <h1>Confirmation Email Sent.</h1>
        <p>Please check your email and confirm your email address.</p>
      </div>
    ) : (
      <SignupForm onSubmit={this.props.requestSignup} />
    );
    return <div>{content}</div>;
  }
}

const mapStateToProps = state => ({ ...state.signup });

export default connect(mapStateToProps, {
  requestSignup
})(withRouter(SignUp));
