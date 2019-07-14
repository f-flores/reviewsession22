import axios from 'axios';

export default {
  //  loginCreds = {username: "testuser@example.com", "password": "abc123"}
  login(loginCreds) {
    return axios.post('/api/users/login', loginCreds);
  },
  //  Path to check if user is logged in
  loginCheck() {
    return axios.get('/api/users/login');
  },
  // Path to log out
  logout() {
    return axios.get('/api/users/logout');
  },
  // Path to register or signup new user,
  // you can have more fields than this but "email" and "password" must exist
  // userInfo = {email: "testuser@example.com", password: 12345Password!}
  register(userInfo) {
    return axios.post('/api/users/register', userInfo);
  },
};
