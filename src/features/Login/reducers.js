import assignAll from 'lodash/fp/assignAll';
import * as ActionTypes from './actions';

const defaultState = {
  loginRequested: false,
  loginRequestError: null,
  loginRequestSuccess: false
};

function login(state) {
  return assignAll([state, { loginRequested: true }]);
}

function loginFailure(state) {
  return assignAll([
    state,
    { loginRequested: false, loginRequestError: 'error' }
  ]);
}

function loginSuccess(state, { response }) {
  const { token, success, message } = response;
  if (success) {
    localStorage.setItem('user', token);
    return assignAll([
      state,
      { loginRequested: false, loginRequestSuccess: true }
    ]);
  }

  return assignAll([
    state,
    { loginRequested: false, loginRequestError: message }
  ]);
}

export default function loginReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return login(state);
    case ActionTypes.LOGIN_FAILURE:
      return loginFailure(state);
    case ActionTypes.LOGIN_SUCCESS:
      return loginSuccess(state, action);
    default:
      return state;
  }
}
