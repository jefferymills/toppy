export const SIGNUP = 'SIGNUP';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
const signupRequest = ({
  email,
  password,
  passwordConfirm,
  firstName,
  lastName
}) => ({
  types: [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE],
  url: `signup`,
  method: 'POST',
  body: { email, password, passwordConfirm, firstName, lastName }
});

export const signup = ({
  email,
  password,
  passwordConfirm,
  firstName,
  lastName
}) => dispatch =>
  dispatch(
    signupRequest({ email, password, passwordConfirm, firstName, lastName })
  );
