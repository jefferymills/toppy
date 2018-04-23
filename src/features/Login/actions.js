export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
const loginRequest = (email, password) => ({
  types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE],
  url: `authenticate`,
  method: 'POST',
  body: { email, password }
});

export const login = (email, password) => dispatch =>
  dispatch(loginRequest(email, password));
