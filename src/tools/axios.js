import axios from 'axios';
import baseUrl from '../constants/baseUrl';
import history from '../history';
import { message } from 'antd';

axios.defaults.baseURL = baseUrl;

axios.interceptors.request.use(function (req) {
    if (req.url !== '/login') {
        let now = Date.now();
        let token = window.localStorage.getItem('token');
        let expired = window.localStorage.getItem('expired_date');

        if (token && expired) {
            if (expired - now < 0) {
                message.info('token过期');
                window.localStorage.clear();
                setTimeout(() => {
                    history.push('/login');
                }, 2000);
            }
            req.headers.Authorization = `${token}`;
        }
    }

    return req;
}, function (error) {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 403) {
        message.info('认证错误！');
        window.localStorage.clear();
        setTimeout(() => {
            history.push('/login');
        }, 2000);
    }
    return Promise.reject(error)
});

export const GET = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.get(url, params).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    });
}

export const POST = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.post(url, params).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}