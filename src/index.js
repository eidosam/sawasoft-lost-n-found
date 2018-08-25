
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './App';
import appStore from './stores/app-store';

const root = (
    <Provider
        AppStore={appStore}
    >
        <App />
    </Provider>
);

ReactDOM.render(root, document.querySelector('#root'));
