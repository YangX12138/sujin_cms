import React, { Fragment, useEffect, useState } from 'react';
import { Table, Icon, Row, Button, message } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import articleService from '../../api/article.service';
import { formatDate } from '../../tools/tools';

function Article(props) {
    const [data, setData] = useState([]);

    const columns = [
        {
            title: '标题',
            dataIndex: 'title',
            width: 200,
        },
        {
            title: '摘要',
            dataIndex: 'summary',
            width: 300,
        },
        {
            title: '缩略图',
            dataIndex: 'thumb',
            render: thumb => {
                return (
                    <img src={thumb} alt="缩略图" height={150} />
                )
            }
        },
        {
            title: '操作',
            width: 200,
            render: (article) => {
                return (
                    <div>
                        <Icon
                            title="更改"
                            style={{ color: 'rgb(24, 144, 255)', cursor: 'pointer' }}
                            type='edit'
                            onClick={() => { editArticle(article._id) }}
                        />
                        <Icon
                            title="删除"
                            style={{ color: 'red', marginLeft: 20, cursor: 'pointer' }}
                            type='delete'
                            onClick={() => { deleteArticle(article._id) }}
                        />
                    </div>
                )
            }
        },
        {
            title: '发布时间',
            dataIndex: 'currentTime',
            width: 200,
            render: currentTime => {
                return formatDate(new Date(currentTime));
            }
        }
    ];

    const rowSelection = {
        onChange: handleSelectChange
    };

    function handleSelectChange(selectedRowKeys, selectedRows) {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }

    function editArticle(id) {
        props.history.push(`/article/${id}`);
    }

    function deleteArticle(id) {
        articleService.deleteArticleById(id).then(res => {
            message.info('成功删除');
            setTimeout(() => {
                getArticles();
                window.scrollTo(0, 0);
            }, 1000)
        }).catch(error => {
            message.error("删除失败");
        })
    }

    function getArticles() {
        articleService.getArticles().then(res => {
            setData(res.data.articles);
        })
    }

    useEffect(() => {
        getArticles();
    }, [])

    return (
        <Fragment>
            <Row style={{ marginBottom: 10 }}>
                <Link to={'/article/add'}>
                    <Button
                        type="primary"
                    >
                        增加
                    </Button>
                </Link>
                <Button
                    style={{ marginLeft: 20 }}
                    type="primary"
                >
                    批量删除
                </Button>
            </Row>
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                rowKey={record => record._id}
            />
        </Fragment>
    )
}

export default withRouter(Article); 