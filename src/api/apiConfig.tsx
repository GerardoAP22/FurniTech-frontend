import axios, { AxiosRequestConfig, AxiosError } from 'axios';


if (!process.env.REACT_APP_LOCALSTORAGE_KEY) {
  throw new Error('Missing REACT_APP_LOCALSTORAGE_KEY');
}

const LOCALSTORAGE_KEY = process.env.REACT_APP_LOCALSTORAGE_KEY;

const API_URL = process.env.REACT_APP_ENVIRONMENT === "development"
  ? process.env.REACT_APP_LOCAL_API_URL
  : process.env.REACT_APP_DEPLOYED_API_URL;

if (!process.env.REACT_APP_LOCAL_API_URL || !process.env.REACT_APP_DEPLOYED_API_URL) {
  throw new Error(API_URL);
}

const apiWithCredentials = axios.create({
  baseURL: API_URL, 
  withCredentials: true
});

const apiWithoutCredentials = axios.create({
  baseURL: API_URL
});

apiWithCredentials.interceptors.request.use(
    (config) => {

  
      const csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken'))
        ?.split('=')[1];

      if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
        }
      
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    })

export { apiWithCredentials, apiWithoutCredentials };

