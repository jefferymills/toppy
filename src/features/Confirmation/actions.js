export const FETCH_CONFIRMATION = 'FETCH_CONFIRMATION';
export const FETCH_CONFIRMATION_SUCCESS = 'FETCH_CONFIRMATION_SUCCESS';
export const FETCH_CONFIRMATION_FAILURE = 'FETCH_CONFIRMATION_FAILURE';
const fetchConfirmationRequest = token => ({
  types: [
    FETCH_CONFIRMATION,
    FETCH_CONFIRMATION_SUCCESS,
    FETCH_CONFIRMATION_FAILURE
  ],
  url: `confirmation/${token}`,
  method: 'GET'
});

export const fetchConfirmation = token => dispatch =>
  dispatch(fetchConfirmationRequest(token));
