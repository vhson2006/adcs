import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMidleware from 'redux-saga';
import RootReducer from './reducers/main';
import LanguagesComponent from './commons/languages/main';
import RootSaga from './sagas/main';

const sagaMiddleware = createSagaMidleware();
const store = createStore(RootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(RootSaga);

const App = () => {
  return (
    <Provider store={store}>
      <LanguagesComponent/>
    </Provider>
  );
}

export default App;
