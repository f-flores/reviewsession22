import axios from 'axios';

export default {
  //  loginCreds = {email: "testuser@example.com", "password": "abc123"}
  loginUser(loginCreds, source) {
    console.log(`in loginFunction: loginCreds: ${JSON.stringify(loginCreds)}`);
    return axios.post('/api/users/login', loginCreds, { cancelToken: source.token });
  },
  //  Path to check if user is logged in
  loginCheck(source) {
    return axios.get('/api/users/login', { cancelToken: source.token });
  },
  // Path to log out
  logout() {
    return axios.get('/api/users/logout');
  },
  // Path to register or signup new user,
  // you can have more fields than this but "email" and "password" must exist
  // userInfo = {email: "testuser@example.com", password: 12345Password!}
  register(userInfo, source) {
    return axios.post('/api/users/register', userInfo, { cancelToken: source.token });
  },
  // cancel request
  cancelRequest(source) {
    source.cancel('API request cancelled.');
    return true;
  },
};
