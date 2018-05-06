import { authHeader } from '../utils';

export default store => next => action => {
  const { types = [], url, method, body } = action;
  const [requestType, successType, failureType] = types;

  if (typeof url === 'undefined') {
    return next(action);
  }

  next({ type: requestType });
  const headers = new Headers(authHeader());
  headers.append('Content-Type', 'application/json');

  const fetchInit = {
    method,
    body: JSON.stringify(body),
    mode: 'cors',
    headers
  };

  return fetch(`http://localhost:9080/api/${url}`, fetchInit)
    .then(
      response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject({
            status: response.status,
            statusText: response.statusText
          });
        }
      },
      error => next({ error, type: failureType })
    )
    .then(response => next({ response, type: successType }))
    .catch(error => {
      next({ error, type: failureType });
    });
};
