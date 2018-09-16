import { FETCH_USER } from '../actions/types';

export default (state = { user: null }, action) => {
    switch (action.type) {
        case FETCH_USER:
            return {
                user: action.payload,
            };
        default:
            return state;
    }
};
