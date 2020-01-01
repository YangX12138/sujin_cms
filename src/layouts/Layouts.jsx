import React from 'react';
import { Layout, Menu, Icon  } from 'antd';
import Routers from '../Routers';
import styles from './Layouts.module.scss';
import { Link, BrowserRouter as Router } from 'react-router-dom';

const { Content, Footer, Sider } = Layout;

const Layouts = () => {
    return (
        <Router>
            <Layout className={ styles.container }>
                <Sider>
                    <div className={ styles.logo } />
                    <Menu theme="dark" defaultSelectedKeys={['2']} mode="inline">
                        <Menu.Item key="1">
                            <Link to={'/cover'}>
                                <Icon type="pie-chart" />
                                <span>首页图</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to={'/article'}>
                                <Icon type="pie-chart" />
                                <span>文章</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Content style={{ margin: '20px' }}>
                        <Routers />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>   
        </Router>
    )
}

export default Layouts;