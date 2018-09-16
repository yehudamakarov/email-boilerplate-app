import { WAITING_FOR_FETCH_USER, COMPLETED_FETCH_USER } from '../actions/types';

export default (state = false, action) => {
    switch (action.type) {
        case WAITING_FOR_FETCH_USER:
            return true;
        case COMPLETED_FETCH_USER:
            return false;
        default:
            return state;
    }
};
