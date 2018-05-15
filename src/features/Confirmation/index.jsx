import React, { PureComponent } from 'react';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchConfirmation } from './actions';

class Confirmation extends PureComponent {
  constructor(props) {
    super(props);
    const { match } = props;
    props.fetchConfirmation(match.params.token);
  }
  render() {
    return (
      <div>
        <h1>Wow! Good Job!</h1>
        <p>
          Your email is confirmed. Now <Link to="/login">login</Link> to start
          murdering other humans
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {
  fetchConfirmation
})(Confirmation);
