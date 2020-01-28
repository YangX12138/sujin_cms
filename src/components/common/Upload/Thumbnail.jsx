import React, { useState } from 'react';
import { Upload, Icon, message } from 'antd';
import baseUrl from '../../../constants/baseUrl';
import PropTypes from 'prop-types';

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
        message.error('Image must smaller than 10MB!');
    }
    return isJpgOrPng && isLt2M;
}

function Thumbnail({ pic, onChange, width }) {
    const [loading, setLoading] = useState(false);
    const uploadButton = (
        <div>
            <Icon type={loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    function handleChange(info) {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            message.info('图片上传成功');
            onChange(info.file.response.path);
            setLoading(false);
        } else if (info.file.status === 'error') {
            message.error('文件上传失败');
        }
    };

    return (
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={`${baseUrl}/upload/thumbnail`}
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            {pic ? <img width={width ? width : 400} src={pic} alt="avatar" /> : uploadButton}
        </Upload>
    )
}

Thumbnail.propTypes = {
    pic: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default Thumbnail;