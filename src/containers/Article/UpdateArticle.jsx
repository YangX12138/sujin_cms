import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Input } from 'antd';
import Thumbnail from '../../components/common/Upload/Thumbnail';
import Editor from 'for-editor'

const { TextArea } = Input;

function UpdateArticle({ match }) {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    // const [pic, setPic] = useState('');
    const [content, setContent] = useState('');

    function changeContent(value) {
        setContent(value);
    }

    function changeTitle(e) {
        setTitle(e.target.value);
    }

    function changeSummary(e) {
        setSummary(e.target.value);
    }

    useEffect(() => {
        
    }, [match])

    return (
        <Fragment>
            <Row style={{ marginBottom: 20 }}>
                <Col span={ 4 }>
                    标题:
                </Col>
                <Col span={ 10 }>
                    <Input 
                        value={ title }
                        onChange={ changeTitle }
                    />
                </Col>
            </Row>
            <Row style={{ marginBottom: 20 }}>
                <Col span={ 4 }>
                    摘要:
                </Col>
                <Col span={ 10 }>
                    <TextArea 
                        rows={ 6 } 
                        value={ summary }
                        onChange={ changeSummary }
                    />
                </Col>
            </Row>
            <Row style={{ marginBottom: 20 }}>
                <Col span={ 4 }>
                    缩略图:
                </Col>
                <Col span={ 10 }>
                    <Thumbnail />
                </Col>
            </Row>
            <Row style={{ marginBottom: 20 }}>
                <Col span={ 4 }>
                    内容:
                </Col>
                <Col span={ 16 }>
                    <Editor 
                        value={content} 
                        onChange={changeContent} 
                    />
                </Col>
            </Row>
            <Row style={{ marginBottom: 60 }}>
                <Col span={ 4 }>
                    标签:
                </Col>
                <Col span={ 16 }>
                </Col>
            </Row>
        </Fragment>
    )
}

export default UpdateArticle;