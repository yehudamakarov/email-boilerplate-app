import axios from 'axios';
import { FETCH_USER, WAITING_FOR_FETCH_USER, COMPLETED_FETCH_USER } from './types';

export const fetchUser = () => dispatch =>
    axios
        .get('/api/current_user')
        .then(resp => {
            dispatch({ type: FETCH_USER, payload: resp.data });
        })
        .then(() => dispatch({ type: COMPLETED_FETCH_USER }));

export const loadingUser = () => dispatch => dispatch({ type: WAITING_FOR_FETCH_USER });

export const handleCharge = token => dispatch => {
    axios.post('/api/charge', token).then(resp => {
        dispatch({ type: FETCH_USER, payload: resp.data });
    });
};
