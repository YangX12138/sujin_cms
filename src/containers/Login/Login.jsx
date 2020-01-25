import React, { Fragment, useState, useEffect } from 'react';
import styles from './Login.module.scss';
import userService from '../../api/user.service';
import cs from 'classnames';
import { message } from 'antd';

function Login({ history }) {
    const [username, setUserName] = useState('yang');
    const [password, setPassword] = useState('123');
    const [canLogin, setCanLogin] = useState(false);

    useEffect(() => {
        if (username && password) {
            setCanLogin(true);
        } else {
            setCanLogin(false);
        }
    }, [username, password]);

    function changeUserName(event) {
        setUserName(event.target.value);
    }

    function changePassword(event) {
        setPassword(event.target.value);
    }

    function handleLogin() {
        if (canLogin) {
            userService.login({ username, password }).then(res => {
                if (res.data.success) {
                    window.localStorage.setItem('token', `${res.data.token}`);
                    window.localStorage.setItem('expired_date', `${res.data.expired_date}`);
                    history.push('/');
                }
                message.info(res.data.msg);
            })
        }
    }

    return (
        <Fragment>
            <div className={styles.container}>
                <div className={styles.background} />
                <div className={styles.loginWrapper}>
                    <div className={styles.title}></div>
                    <div className={styles.user_input_group}>
                        <label className={styles.user_label}>
                            用户名
                            <input
                                className={styles.user_input}
                                value={username}
                                onChange={changeUserName}
                            />
                        </label>
                    </div>
                    <div className={styles.user_input_group}>
                        <label className={styles.user_label}>
                            密码
                            <input
                                className={styles.user_input}
                                type="password"
                                value={password}
                                onChange={changePassword}
                            />
                        </label>
                    </div>
                    <button
                        className={canLogin ? cs(styles.login, styles.can) : styles.login}
                        onClick={handleLogin}
                    >
                        登录
                    </button>
                </div>
            </div>
        </Fragment>
    )
}

export default Login;