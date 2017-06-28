import api from './apiService';

class Session {
  static login(user) {
    return api.post('/users/sign_in', user);
  }

  static logout() {
    return api.delete('/users/sign_out');
  }
}

export default Session;
