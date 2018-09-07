/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import store from './store/createStore';

const theme = createMuiTheme({
    typography: {
        fontFamily: ['"Merriweather"', 'serif'].join(','),
        fontWeightLight: 400,
        fontWeightRegular: 700,
        fontWeightMedium: 900,
    },
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <App />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root') // eslint-disable-line
);
registerServiceWorker();
