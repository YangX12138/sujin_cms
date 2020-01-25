import React, { memo, useState, useRef, useEffect } from 'react';
import { Tag, Input, Icon } from 'antd';
import PropTypes from 'prop-types';

function Tags({ tags, onChange }) {
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState('');
    const tagChild = tags.map(forMap);
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current && visible) {
            inputRef.current.focus();
        }
    }, [visible])

    return (
        <div>
            {tagChild}
            {visible && (
                <Input
                    ref={inputRef}
                    type="text"
                    size="small"
                    style={{ width: 78 }}
                    value={value}
                    onChange={(e) => { setValue(e.target.value) }}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                />
            )}
            {!visible && (
                <Tag
                    onClick={showInput}
                    style={{ background: '#fff', borderStyle: 'dashed' }}
                >
                    <Icon type="plus" /> New Tag
                </Tag>
            )}
        </div>
    )
    function handleInputConfirm() {
        setVisible(false);
        let nTags = Object.assign([], tags);
        if (value && tags.indexOf(value) === -1) {
            nTags = [...tags, value];
        }
        onChange(nTags);
        setValue('')
    }
    function showInput() {
        setVisible(true);
    }
    function forMap(tag) {
        const tagElem = (
            <Tag
                closable
                onClose={e => {
                    e.preventDefault();
                    handleClose(tag);
                }}
            >
                {tag}
            </Tag>
        );
        return (
            <span key={tag} style={{ display: 'inline-block' }}>
                {tagElem}
            </span>
        );
    };
    function handleClose(removedTag) {
        let nTags = tags.filter(tag => tag !== removedTag);
        onChange(nTags);
    };
}

Tags.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired
}

export default memo(Tags);