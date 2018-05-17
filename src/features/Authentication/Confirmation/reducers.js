import assignAll from 'lodash/fp/assignAll';
import * as ActionTypes from './actions';

const initialState = {
  confirmationRequested: false,
  confirmationSuccess: false,
  confirmationRequestError: null
};

function fetchConfirmation(state) {
  return assignAll([state, { confirmationRequested: true }]);
}

function fetchConfirmationFailure(state) {
  return assignAll([
    state,
    { confirmationSuccess: false, confirmationRequestError: 'error' }
  ]);
}

function fetchConfirmationSuccess(state, { response }) {
  return assignAll([
    state,
    { confirmationRequested: false, confirmationSuccess: response.result }
  ]);
}

export default function confirmationReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FETCH_CONFIRMATION:
      return fetchConfirmation(state, action);
    case ActionTypes.FETCH_CONFIRMATION_SUCCESS:
      return fetchConfirmationSuccess(state, action);
    case ActionTypes.FETCH_CONFIRMATION_FAILURE:
      return fetchConfirmationFailure(state);
    default:
      return state;
  }
}
