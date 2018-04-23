const headers = new Headers();
headers.append('Content-Type', 'application/json');

export default store => next => action => {
  const { types = [], url, method, body } = action;
  const [requestType, successType, failureType] = types;

  if (typeof url === 'undefined') {
    return next(action);
  }

  next({ type: requestType });

  const fetchInit = {
    method,
    body: JSON.stringify(body),
    mode: 'cors',
    headers
  };

  return fetch(`http://localhost:9080/api/${url}`, fetchInit)
    .then(
      response => response.json(),
      error => next({ error, type: failureType })
    )
    .then(response => next({ response, type: successType }));
};