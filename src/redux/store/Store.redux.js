import {addEventListener} from '@react-native-community/netinfo';
import {applyMiddleware, compose, createStore} from 'redux';
import {persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import RootReducer from '../reducers/index';
import {watcherSaga} from '../sagas/rootSaga';

const sagaMiddleWare = createSagaMiddleware();
const middleWare = [sagaMiddleWare];

let composeDebuger = compose;
if (__DEV__) {
  composeDebuger = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
const store = createStore(
  RootReducer,
  composeDebuger(applyMiddleware(...middleWare)),
);

addEventListener(state => {
  if (state.isConnected) {
    sagaMiddleWare.run(watcherSaga);
  }
});

const persister = persistStore(store);

export {store, persister};
