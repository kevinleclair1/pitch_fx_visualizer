import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers
} from 'redux';

import createSagaMiddleware from 'redux-saga';

import { initializeCurrentLocation } from 'redux-little-router';

import allReducers from '../redux';

import rootSaga from '../sagas';

import routerObj from './routes.js';

const getCompose = () => {
  if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }

  return compose;
}

const sageMiddleware = createSagaMiddleware();

const composeEnhancers = getCompose();

const store = createStore(
  combineReducers({
    localAppData: allReducers,
    router: routerObj.reducer
  }),
  composeEnhancers(
    routerObj.enhancer,
    applyMiddleware(
      sageMiddleware,
      routerObj.middleware
    )
  )
)

sageMiddleware.run(rootSaga);

const initialLocation = store.getState().router;

if (initialLocation) {
  store.dispatch(initializeCurrentLocation(initialLocation));
};

export default store