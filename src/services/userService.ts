import httpClient from '../httpClient';

class UserService {
    login(user: { user: any }) {
        return httpClient.post('/users/sign_in', user);
    }

    logout() {
        return httpClient.delete('/users/sign_out', { data: {} });
    }

    signUp(user: { user: any }) {
        return httpClient.post('/users', user);
    }
}

export default new UserService();
