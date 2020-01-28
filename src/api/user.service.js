import { POST, GET } from '../tools/axios';

class UserService {
    login(params) {
        return POST('/users/login', params);
    }

    add() {
        return GET('/users/add', null);
    }
}

export default new UserService();