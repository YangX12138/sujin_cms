import React, { Fragment, useState, useEffect, memo } from 'react';
import { Row, Col, Input, Button, message } from 'antd';
import Thumbnail from '../../components/common/Upload/Thumbnail';
import Editor from 'for-editor';
import Tags from '../../components/common/Tags/Tags';
import BGMusic from '../../components/common/Upload/BGMusic';
import articleService from '../../api/article.service';

const { TextArea } = Input;

function UpdateArticle({ match, history }) {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [pic, setPic] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [music, setMusic] = useState('');
    const [musicName, setMusicName] = useState('');
    const isAdd = !match.params.id;

    useEffect(() => {
        if (match.params.id) {
            getArticleById(match.params.id);
        }
    }, [match])

    return (
        <Fragment>
            <Row style={{ marginBottom: 20 }}>
                <Col span={4}>
                    标题:
                </Col>
                <Col span={10}>
                    <Input value={title} onChange={changeTitle} />
                </Col>
            </Row>
            <Row style={{ marginBottom: 20 }}>
                <Col span={4}>
                    摘要:
                </Col>
                <Col span={10}>
                    <TextArea
                        rows={6}
                        value={summary}
                        onChange={changeSummary}
                    />
                </Col>
            </Row>
            <Row style={{ marginBottom: 20 }}>
                <Col span={4}>
                    缩略图:
                </Col>
                <Col span={10}>
                    <Thumbnail pic={pic} onChange={(pic) => { setPic(pic) }} />
                </Col>
            </Row>
            <Row style={{ marginBottom: 20 }}>
                <Col span={4}>
                    内容:
                </Col>
                <Col span={16}>
                    <Editor value={content} onChange={changeContent} />
                </Col>
            </Row>
            <Row style={{ marginBottom: 20 }}>
                <Col span={4}>
                    标签:
                </Col>
                <Col span={16}>
                    <Tags tags={tags} onChange={(tags) => { setTags(tags) }} />
                </Col>
            </Row>
            <Row style={{ marginBottom: 60 }}>
                <Col span={4}>
                    背景音乐:
                </Col>
                <Col span={16}>
                    <Row>
                        <Col span={12}>
                            <Row style={{ marginBottom: 20 }} gutter={20}>
                                <Col span={16}>
                                    <Input
                                        placeholder="音乐名称"
                                        disabled
                                        value={musicName}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col span={16}>
                                    <Input
                                        placeholder="音乐地址"
                                        disabled
                                        value={music}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <BGMusic
                                onChange={(name, path) => {
                                    setMusic(path);
                                    setMusicName(name);
                                }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row style={{ marginBottom: 60 }}>
                <Col span={20}>
                </Col>
                <Col span={4}>
                    {
                        isAdd ?
                            <Button
                                type={"primary"}
                                onClick={handleAddArticle}
                            >增加新文章</Button>
                            :
                            <Button
                                type={"primary"}
                                onClick={handleUpdateArticle}
                            >更新文章</Button>
                    }
                </Col>
            </Row>
        </Fragment>
    )
    function getArticleById(id) {
        articleService.getArticleById(id).then(res => {
            let article = res.data.article;
            setTitle(article.title);
            setSummary(article.summary);
            setPic(article.thumb);
            setContent(article.content);
            setTags(article.tags);
            setMusic(article.music);
            setMusicName(article.music_name);
        }).catch(error => {
            message.error("错误信息:" + error.message);
        })
    }
    function changeContent(value) {
        setContent(value);
    }
    function changeTitle(e) {
        setTitle(e.target.value);
    }
    function changeSummary(e) {
        setSummary(e.target.value);
    }
    function handleAddArticle() {
        articleService.addArticle(getArticle()).then(res => {
            message.info('新增文章成功');
            setTimeout(() => {
                history.push('/article');
            }, 1000);
        }).catch(error => {
            message.error('新增失败');
        })
    }
    function handleUpdateArticle() {
        if (match.params.id) {
            articleService.updateArticle(match.params.id, getArticle()).then(res => {
                message.info('更新成功');
                setTimeout(() => {
                    history.push('/article');
                }, 1000);
            }).catch(error => {
                message.error('更新失败');
            })
        }
    }
    function getArticle() {
        let article = {
            title,
            summary,
            thumb: pic,
            content,
            tags,
            music,
            music_name: musicName
        };

        return article;
    }
}

export default memo(UpdateArticle);