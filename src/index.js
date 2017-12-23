import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';


import App from './components/App';
import './stylesheets/main.scss';
import { reducers } from './reducers/index';
import Home from './pages/Home';
import UserEdit from './pages/UserEdit';
import NotFound from './pages/NotFound';

let users = [];

for (let i = 1; i < 28; i++) {
  users.push({
    id: i,
    username: 'John' + i,
    job: 'Employee' + i
  });
}

const initial_state = {
  users: {
    list: users
  },
}

let middleware = applyMiddleware(routerMiddleware(browserHistory));
const store = createStore(reducers, initial_state, middleware);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="user-edit(/:id)" component={UserEdit} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);