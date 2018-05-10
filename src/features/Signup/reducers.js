import assignAll from 'lodash/fp/assignAll';
import * as ActionTypes from './actions';

function signup(state) {
  return assignAll([state, { signupRequested: true }]);
}

function signupFailure(state) {
  return assignAll([
    state,
    { signupRequested: false, signupRequestError: 'error' }
  ]);
}

function signupSuccess(state, { response }) {
  const { token, success, message } = response;
  if (success) {
    localStorage.setItem('user', token);
    return assignAll([state, { signupRequested: false }]);
  }

  return assignAll([
    state,
    { signupRequested: false, signupRequestError: message }
  ]);
}

export default function signupReducer(state = {}, action) {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return signup(state);
    case ActionTypes.LOGIN_FAILURE:
      return signupFailure(state);
    case ActionTypes.LOGIN_SUCCESS:
      return signupSuccess(state, action);
    default:
      return state;
  }
}
