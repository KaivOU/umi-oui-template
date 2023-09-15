import React from 'react';
import { Menu } from 'antd';
import { menuConfig } from './menuConfig';
import { history } from 'umi';
// import { ReactComponent as Logo } from './assets/xxx.svg';
export default () => {
    const pathname = history.location.pathname;
    const onMenu = pathname.split('/')[1];

    const renderItem = (text: string, path?: string) => {
        const onClick = () => {
            path &&
                history.push(path, {
                    // tyoe: '22',
                });
        };
        return (
            <div className="side-item" onClick={onClick}>
                {text}
            </div>
        );
    };
    const menuConfigTemp = menuConfig(renderItem);

    return (
        <div className="menu-side">
            <div className="logo">{/* <Logo style={{ margin: '24px 0 12px 0' }}></Logo> */}</div>
            <Menu
                // onClick={onClick}
                // style={{ width: 256 }}
                defaultSelectedKeys={[pathname]}
                defaultOpenKeys={[`/${onMenu}`]}
                mode="inline"
                theme="dark"
                items={menuConfigTemp}
            />
        </div>
    );
};
