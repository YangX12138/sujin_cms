import { POST } from '../tools/axios';

class UserService {
    login(params) {
        return POST('/users/login', params);
    }
}

export default new UserService();