import api from 'api';

class UserService {
  static login(user) {
    return api.post('/users/sign_in', user);
  }

  static logout() {
    return api.delete('/users/sign_out');
  }

  static signUp(user) {
    return api.post('/users', user);
  }
}

export default UserService;
