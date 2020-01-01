import React, { Fragment, } from 'react';
import { Table, Icon, Row, Button} from 'antd';
import { Link } from 'react-router-dom';  

const data = [
    {
        id: '123',
        title: '雨中的猫',
        summary: '记得早先少年时 大家诚诚恳恳 说一句 是一句 清早上火车站 长街黑暗无行人 卖豆浆的小店冒着热气 从前的日色变得慢 车，马，邮件都慢 一生只够爱一个人   从前的锁也好看 钥...',
        currentTime: '二月 10, 2013',
        tags: 'aaaa',
        thumb: 'https://isujin.com/wp-content/uploads/2014/07/bmcbamugw_485922_3316x2214-300x200.jpg'
    },
];  

function Article() {
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
            render: () => {
                return (
                    <div>
                        <Icon
                            style={{color: 'rgb(24, 144, 255)', cursor: 'pointer'}}
                            type='edit' 
                            onClick={editArticle}
                        />
                        <Icon 
                            style={{color: 'red', marginLeft: 20, cursor: 'pointer'}}
                            type='delete'
                            onClick={deleteArticle}
                        />
                    </div>
                )
            }
        },
        {
            title: '发布时间',
            dataIndex: 'currentTime',
            width: 200
        }
    ];
    const rowSelection = {
        onChange: handleSelectChange
    };

    function handleSelectChange(selectedRowKeys, selectedRows) {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }

    function editArticle() {
        console.log('edit');
    }

    function deleteArticle() {
        console.log('delete');
    }
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
                rowKey={record => record.id}
            />
        </Fragment>
    )
}

export default Article; 