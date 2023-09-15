import React from 'react';
import { ErrorBoundary } from 'core/mz';
import { Row, Col, ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import Logout from './logout';

import Menu from './Menu';
import './index.less';

// type MenuItem = Required<MenuProps>['items'][number];

export interface BasicLayoutProps {}

const BasicLayout: React.PropsWithChildren<BasicLayoutProps> = (props) => {
    const { children } = props;

    return (
        <ConfigProvider locale={zhCN}>
            <Row className="content-main-back">
                <Col style={{ width: '200px' }}>
                    <Menu />
                </Col>
                <Col className="content-main-right" style={{ width: 'calc(100% - 200px)' }}>
                    <div className="content-main-head">
                        <Logout />
                    </div>
                    <div className="content-main-inner">
                        <ErrorBoundary>{children}</ErrorBoundary>
                    </div>
                </Col>
            </Row>
        </ConfigProvider>
    );
};

export default BasicLayout;
