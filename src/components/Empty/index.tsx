import React from 'react';
import { Empty } from 'antd';
import './index.less';

const EmptyDate = () => {
    return (
        <>
            <Empty className="empty-style" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </>
    );
};

export default EmptyDate;
