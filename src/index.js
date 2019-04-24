import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';
import App from './components/App';
import rootReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk),
    persistState(null, 'state')
  )
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
