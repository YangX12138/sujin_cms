import React, { memo } from 'react';
import { Upload, message, Button, Icon } from 'antd';
import baseUrl from '../../../constants/baseUrl';

function BGMusic({ onChange }) {
    return (
        <Upload
            name="music"
            action={`${baseUrl}/upload/music`}
            onChange={handleChange}
        >
            <Button>
                <Icon type="upload" /> 点击上传背景音乐
        </Button>
        </Upload>
    )
    function handleChange(info) {
        if (info.file.status === 'done') {
            onChange(info.file.response.name, info.file.response.path);
            message.info('文件上传成功');
        } else if (info.file.status === 'error') {
            message.error('文件上传失败');
        }
    }
}

export default memo(BGMusic);