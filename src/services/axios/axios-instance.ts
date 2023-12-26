import axios from 'axios';

import {
  LocalStorageService,
} from '@/services/local-storage/local-storage.service';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/v1/',
});

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${LocalStorageService.get(
    'authToken',
  )}`;

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const pathname = window.location.pathname;

    if (error.response && error.response.status === 401) {
      if (localStorage.getItem('authToken') && (
        pathname !== '/' &&
        pathname !== '/registration' &&
        pathname !== '/login'
      )) {
        localStorage.removeItem('authToken');
        window.location.href = '/';
      }

      return;
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
