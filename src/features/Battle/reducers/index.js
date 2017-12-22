import * as ActionTypes from '../actions';
import assignAll from 'lodash/fp/assignAll';

function fetchBattle(state) {
  return assignAll([state, { battleRequested: true }]);
}

function fetchBattleFailure(state) {
  return assignAll([
    state,
    { battleRequested: false, battleRequestError: 'error' }
  ]);
}

function fetchBattleSuccess(state, { response }) {
  return assignAll([
    state,
    { battleRequested: false, currentBattle: response.result }
  ]);
}

export default function battleReducer(state = {}, action) {
  switch (action.type) {
    case ActionTypes.FETCH_BATTLE:
      return fetchBattle(state);
    case ActionTypes.FETCH_BATTLE_FAILURE:
      return fetchBattleFailure(state);
    case ActionTypes.FETCH_BATTLE_SUCCESS:
      return fetchBattleSuccess(state, action);
    default:
      return state;
  }
}
