import axios from 'axios';
import { useHistory  } from "react-router-dom";

import environment from "~/environment/index";

export const baseurl = environment[process.env.NODE_ENV];

const api = axios.create({
    baseURL: baseurl
}); 

api.interceptors.request.use(async (config) => {
    if (
        !config.url.endsWith('login') ||
        !config.url.endsWith('refresh') ||
        !config.url.endsWith('signup')
    ) {
        const access_token = window.localStorage.getItem('access_token');
        config.headers.Authorization = `Bearer ${access_token}`;
    }
  
    return config;
  }, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use((response) => {
    return response;
  },(error) => {
    if (error.response.status === 401) {     
        const history = useHistory();
        history.push('/login');
    }
    return Promise.reject(error);
});

export default api;