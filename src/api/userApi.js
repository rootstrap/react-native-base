import api from './apiService';
import API_URL from '../constants/config'

class Session {
  static login(params) {
    data = 'username='+ encodeURI(params.user.email) + '&' + 'grant_type=password&password=' + encodeURI(params.user.password);
    return api.post('/users/sign_in', data, API_URL, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      disableTransformBody: true
    });
  }

  static logout() {
    return api.delete('/users/sign_out');
  }

  static getUserData() {
    return api.get('/users/metadata');
  }
}

export default Session;
