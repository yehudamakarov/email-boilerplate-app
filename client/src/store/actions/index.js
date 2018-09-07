import axios from 'axios';
import { AUTH_SUCCEEDED, FAILED_AUTH } from './types';

export const fetchUser = () => dispatch =>
    axios.get('/api/current_user').then(resp => {
        if (resp.data) {
            dispatch({ type: AUTH_SUCCEEDED, payload: resp.data });
        } else {
            dispatch({ type: FAILED_AUTH, payload: resp.data });
        }
    });
