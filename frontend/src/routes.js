import axios from 'axios';

const routes = {
    authorise: (username, password) => axios.post('/api/v1/login', { username, password }),
    getData: (token) => axios.get('api/v1/data', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }),
}

export default routes;

