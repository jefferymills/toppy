import assignAll from 'lodash/fp/assignAll';
import * as ActionTypes from './actions';

const initialState = {
  signupRequested: false,
  signupRequestError: null,
  signupRequestSuccess: false
};

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
  const { success, message } = response;
  if (success) {
    return assignAll([
      state,
      { signupRequested: false, signupRequestSuccess: true }
    ]);
  }

  return assignAll([
    state,
    { signupRequested: false, signupRequestError: message }
  ]);
}

export default function signupReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SIGNUP:
      return signup(state);
    case ActionTypes.SIGNUP_FAILURE:
      return signupFailure(state);
    case ActionTypes.SIGNUP_SUCCESS:
      return signupSuccess(state, action);
    default:
      return state;
  }
}
