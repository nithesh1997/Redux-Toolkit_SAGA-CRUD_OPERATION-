import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import postSlice from './reducer/postSlice';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import mySaga from '@redux-saga/core'
import { fetchDataSagaList } from './Redux-Saga/fetchDataSagaList';


const sagaMiddleware = mySaga()

const store = configureStore({
  reducer: {
    post: postSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: false
  }).concat(sagaMiddleware)
})

sagaMiddleware.run(fetchDataSagaList)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

