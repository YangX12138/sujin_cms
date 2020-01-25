import { GET, POST } from '../tools/axios';

class ArticleService {
    getArticles() {
        return GET(`/articles/`, null);
    }

    addArticle(params) {
        return POST(`/articles/add`, params);
    }

    getArticleById(id) {
        return GET(`/articles/id/${id}`, null);
    }

    updateArticle(id, params) {
        return POST(`/articles/update/${id}`, params);
    }

    deleteArticleById(id) {
        return POST(`/articles/delete/${id}`, null);
    }
}

export default new ArticleService();