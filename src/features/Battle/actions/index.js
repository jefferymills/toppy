export const FETCH_BATTLE = 'FETCH_BATTLE';
export const FETCH_BATTLE_SUCCESS = 'FETCH_BATTLE_SUCCESS';
export const FETCH_BATTLE_FAILURE = 'FETCH_BATTLE_FAILURE';
export const fetchBattleRequest = warId => ({
  types: [FETCH_BATTLE, FETCH_BATTLE_SUCCESS, FETCH_BATTLE_FAILURE],
  url: `wars/${warId}/battles/new`,
  method: 'GET'
});

export const fetchBattle = warId => dispatch =>
  dispatch(fetchBattleRequest(warId));

export const DECLARE_BATTLE = 'DECLARE_BATTLE';
export const DECLARE_BATTLE_SUCCESS = 'DECLARE_BATTLE_SUCCESS';
export const DECLARE_BATTLE_FAILURE = 'DECLARE_BATTLE_FAILURE';
export const declareBattleRequest = (warId, winnerId, loserId) => ({
  types: [DECLARE_BATTLE, DECLARE_BATTLE_SUCCESS, DECLARE_BATTLE_FAILURE],
  url: `wars/${warId}/battles/declare`,
  method: 'POST',
  body: { winnerId, loserId }
});

export const declareBattle = (warId, winnerId, loserId) => dispatch =>
  dispatch(declareBattleRequest(warId, winnerId, loserId));
