import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './i18nextConf';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './Services/reducers/index';
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  // <React.StrictMode>
  <Suspense fallback={(<div>Loading...</div>)}>
    <Provider store={store}>
      <App />
    </Provider >
  </Suspense>,
  // </React.StrictMode>,
  document.getElementById('root')
);
