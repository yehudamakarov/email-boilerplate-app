/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

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
    palette: {
        primary: blue,
        secondary: red,
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
