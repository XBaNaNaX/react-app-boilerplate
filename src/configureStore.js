import { createStore,compose,applyMiddleware } from 'redux'
import app from './reducers'

import createSagaMiddleware from 'redux-saga';
import dataSaga from './saga';

const sagaMiddleware = createSagaMiddleware()
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default function configureStore() {
  let store = createStore(app,
    applyMiddleware(sagaMiddleware))

    sagaMiddleware.run(dataSaga)
  return store
}