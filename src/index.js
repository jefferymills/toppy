import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware
} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { Route, Switch } from 'react-router';
import { withRouter } from 'react-router-dom';
import ProtectedRoute from './utils/ProtectedRoute';
import './index.css';
import Home from './Home';
import Login from './features/Login';
import Battle from './features/Battle/index';
import registerServiceWorker from './registerServiceWorker';

import reducers from './reducers';
import api from './middleware/api';

const history = createHistory();
const store = createStore(
  combineReducers({
    router: routerReducer,
    ...reducers
  }),
  applyMiddleware(routerMiddleware(history), thunk, api)
);

const ConnectedSwitch = withRouter(
  connect(state => ({ location: state.location }))(Switch)
);

const AppContainer = () => (
  <ConnectedSwitch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <ProtectedRoute path="/battle" component={Battle} />
  </ConnectedSwitch>
);

const App = withRouter(
  connect(state => ({ location: state.location }))(AppContainer)
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
