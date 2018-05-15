import BattleReducers from './features/Battle/reducers';
import LoginReducers from './features/Login/reducers';
import SignupReducers from './features/Signup/reducers';
import ConfirmationReducers from './features/Confirmation/reducers';

export default {
  battle: BattleReducers,
  login: LoginReducers,
  signup: SignupReducers,
  confirmation: ConfirmationReducers
};
