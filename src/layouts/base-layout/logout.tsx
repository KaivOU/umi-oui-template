import { Dropdown, MenuProps, Space } from 'antd';
import React from 'react';
import { history } from 'core/mz';
import { fetchLogout } from '@/service/urlConfig/logout';

export default () => {
    const items: MenuProps['items'] = [
        {
            label: '退出',
            key: 'logout'
        }
    ];
    const onClick: MenuProps['onClick'] = ({ key }) => {
        console.log(key);
        fetchLogout();
        // console.log('手动删除cookie');
        sessionStorage.removeItem('userName');
        history.push('/login');
    };
    const userName = sessionStorage.getItem('userName')
        ? sessionStorage.getItem('userName')
        : '未知用户';
    return (
        <div
            className="logout"
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '100%'
            }}
        >
            <div></div>
            <Dropdown menu={{ items, onClick }} trigger={['click']}>
                <span onClick={(e) => e.preventDefault()} style={{ cursor: 'pointer' }}>
                    <Space>
                        <span>欢迎您</span>
                        <span>{userName}</span>
                        {/* <Button type="primary" style={{ backgroundColor: 'rgba(170, 0, 26, .8)' }}>
                            退出登录
                        </Button> */}
                    </Space>
                </span>
            </Dropdown>
        </div>
    );
};
