import assignAll from 'lodash/fp/assignAll';
import * as ActionTypes from '../actions';

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

function fetchUserBattleList(state) {
  return assignAll([state, { userBattleListRequested: true }]);
}

function fetchUserBattleListSuccess(state, { response }) {
  return assignAll([
    state,
    { userBattleListRequested: false, userBattleList: response.result }
  ]);
}

function fetchUserBattleListFailure(state) {
  return assignAll([
    state,
    { userBattleListRequested: false, userBattleListError: 'error' }
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
    case ActionTypes.FETCH_USER_BATTLE_LIST:
      return fetchUserBattleList(state);
    case ActionTypes.FETCH_USER_BATTLE_LIST_SUCCESS:
      return fetchUserBattleListSuccess(state, action);
    case ActionTypes.FETCH_USER_BATTLE_LIST_FAILURE:
      return fetchUserBattleListFailure(state);
    default:
      return state;
  }
}
