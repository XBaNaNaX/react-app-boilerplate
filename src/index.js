import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.scss';

const store = configureStore();

const ReduxApp = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(ReduxApp, document.getElementById('root'));
registerServiceWorker();
