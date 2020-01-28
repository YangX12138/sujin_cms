import { GET, POST } from '../tools/axios';

class CoverService {
    getCover() {
        return GET('/cover', null);
    }

    updateCoverById(id, params) {
        return POST(`/cover/update/${id}`, params);
    }
}

export default new CoverService();