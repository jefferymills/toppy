import BattleReducers from './features/Battle/reducers';
import AuthenticationReducers from './features/Authentication/reducers';

export default {
  battle: BattleReducers,
  ...AuthenticationReducers
};
