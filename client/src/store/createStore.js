import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(reduxThunk), // eslint-disable-next-line no-underscore-dangle, no-undef
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;
