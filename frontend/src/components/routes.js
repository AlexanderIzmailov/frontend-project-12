import axios from 'axios';

const routes = {
    authorise: (username, password) => axios.post('/api/v1/login', { username, password })
}

export default routes;

