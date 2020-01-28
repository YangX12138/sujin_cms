import React, { Fragment, useState, useEffect } from 'react';
import { Table, Row, Col, message } from 'antd';
import { formatDate } from '../../tools/tools';
import { Icon, Modal } from 'antd';
import Thumbnail from '../../components/common/Upload/Thumbnail';
import coverService from '../../api/cover.service';

function Cover() {
    const [visible, setVisible] = useState(false);
    const [image, setImage] = useState('');
    const [data, setData] = useState([]);

    const columns = [
        {
            title: '图片',
            dataIndex: 'bg_img',
            render: (img) => (
                <img width={300} alt="背景" src={`${img}`} />
            )
        },
        {
            title: '操作',
            render: () => (
                <div>
                    <Icon
                        title="更改"
                        style={{ color: 'rgb(24, 144, 255)', cursor: 'pointer' }}
                        type='edit'
                        onClick={editCover}
                    />
                </div>
            )
        },
        {
            title: '更新时间',
            dataIndex: 'current_time',
            render: (time) => (
                <span>{formatDate(new Date(time))}</span>
            )
        },
    ];

    useEffect(() => {
        getCover();
    }, [])

    return (
        <Fragment>
            <Table
                dataSource={data}
                columns={columns}
                rowKey={record => record._id}
            />;
            <Modal
                title="更新首页图"
                visible={visible}
                onOk={handleUpdate}
                onCancel={handleCancel}
                okText="更新"
                cancelText="关闭"
            >
                <Row>
                    <Col span={4}>
                        图片:
                    </Col>
                    <Col span={16}>
                        <Thumbnail width={200} pic={image} onChange={(path) => { setImage(path) }} />
                    </Col>
                </Row>
            </Modal>
        </Fragment>
    )
    function editCover() {
        setVisible(true);
    }
    function handleUpdate() {
        if (data[0]._id) {
            coverService.updateCoverById(data[0]._id, Object.assign({}, data[0], { bg_img: image }));
        }
        message.info('更新成功');
        setTimeout(() => {
            getCover();
            setVisible(false);
        }, 1000)
    }
    function handleCancel() {
        setVisible(false);
    }
    function getCover() {
        coverService.getCover().then(res => {
            if (res.data.code === 0) {
                setData([res.data.cover]);
                setImage(res.data.cover.bg_img);
            }
        })
    }
}

export default Cover;