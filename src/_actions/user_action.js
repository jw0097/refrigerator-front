import axios from 'axios';
import { LOGIN_USER, LOGOUT_USER } from './types';
import {API_KEY, PORT} from '@env';

export function loginUser(dataToSubmit) {
    const request = axios.post('http://'+API_KEY+':'+PORT+'/auth/login', dataToSubmit)
     .then(response => response.data)
     .catch(error => console.log(error))

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function logoutUser() {
    return {
        type: LOGOUT_USER,
        payload: []
    }
}