import React, { useState } from 'react';
import { Upload, Icon, message } from 'antd';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

function Thumbnail(){
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const uploadButton = (
        <div>
          <Icon type={loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">Upload</div>
        </div>
    );

    function handleChange(info){
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, function(imageUrl){
                setImageUrl(imageUrl);
                setLoading(false);
            });
        }
    };

    return (
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="http://localhost:3000/upload/thumbnail"
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            {imageUrl ? <img width={ 400 } src={imageUrl} alt="avatar" /> : uploadButton}
        </Upload>
    )
}

export default Thumbnail;