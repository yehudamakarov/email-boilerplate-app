import { AUTH_SUCCEEDED, FAILED_AUTH } from '../actions/types';

export default (state = { loggedIn: false, user: {} }, action) => {
    switch (action.type) {
        case AUTH_SUCCEEDED:
            return {
                loggedIn: true,
                user: action.payload,
            };
        case FAILED_AUTH:
            return {
                loggedIn: false,
                user: action.payload,
            };
        default:
            return state;
    }
};
