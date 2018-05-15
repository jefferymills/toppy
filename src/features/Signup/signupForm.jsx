import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class SignupForm extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: ''
    };
  }

  handleInputChange = e => {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value
    });
  };

  handleSignUpClick = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.onSubmit(this.state);
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      passwordConfirm
    } = this.state;

    const onChange = { onChange: this.handleInputChange };
    return (
      <form onSubmit={this.handleSignUpClick}>
        <div>
          <label htmlFor="firstName">First name</label>
          <input type="text" name="firstName" value={firstName} {...onChange} />
        </div>
        <div>
          <label htmlFor="lastName">Last name</label>
          <input type="text" name="lastName" value={lastName} {...onChange} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} {...onChange} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            {...onChange}
          />
        </div>
        <div>
          <label htmlFor="password-repeat">Confirm Password</label>
          <input
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            {...onChange}
          />
        </div>
        <input type="submit" value="Sign Up" />
      </form>
    );
  }
}

export default SignupForm;
