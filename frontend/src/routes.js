import axios from 'axios';

const routes = {
  authorise: (username, password) => axios.post('/api/v1/login', { username, password }),
  getData: (token) => axios.get('api/v1/data', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  createUser: (username, password) => axios.post('/api/v1/signup', { username, password }),
};

export default routes;
