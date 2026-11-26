import axios from 'axios';

// Attach the login token to every request to the PHP backend.
axios.interceptors.request.use((config) => {
  try {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (auth && auth.token) {
      config.headers['X-Auth-Token'] = auth.token;
    }
  } catch (e) {
    // No saved login yet.
  }
  return config;
});

// If the token is missing or expired, send the user back to the login page.
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401 && !window.location.pathname.endsWith('/pages/login')) {
      localStorage.clear();
      window.location.href = '/pages/login';
    }
    return Promise.reject(error);
  }
);
