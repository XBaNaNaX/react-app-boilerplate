import { createStore,applyMiddleware } from 'redux'
import app from './reducers'

import createSagaMiddleware from 'redux-saga';
import dataSaga from './saga';

const sagaMiddleware = createSagaMiddleware()

export default function configureStore() {
  let store = createStore(app,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(sagaMiddleware))
    sagaMiddleware.run(dataSaga)
  return store
}