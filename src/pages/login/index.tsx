import React from 'react';
import { useModel, history } from 'core/mz';
import { Button, Form, Input, message } from 'antd';
import __Styles from './index.less';
// import __Styles from './index.less';
// import { ReactComponent as Logo } from './assets/xxx.svg';
import { ReactComponent as UserName } from './assets/user-icon.svg';
import { ReactComponent as Password } from './assets/password-icon.svg';
export default () => {
    const [messageApi, contextHolder] = message.useMessage();

    const { fetchLogin } = useModel('login', (model) => model);
    // app.tsx初始化数据
    // const { initialState, loading, error, refresh, setInitialState } = useModel('@@initialState');
    // console.log('initialState:', initialState);
    const onFinish = (values: any) => {
        // console.log('Success:', values);
        const { username, password } = values;
        fetchLogin(
            {
                userAccount: username,
                password: password
            },
            ({ text, status }: { text: string; status: boolean }) => {
                if (status) {
                    messageApi.open({
                        type: 'success',
                        content: text
                    });
                    history.push('/overview');
                } else {
                    messageApi.open({
                        type: 'error',
                        content: text
                    });
                }
            }
        );
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={__Styles.login}>
            {contextHolder}
            <div className={__Styles.loginLeft}></div>
            <div className={__Styles.loginRight}>
                <div className={__Styles.content}>
                    {/* <Logo className="logo"></Logo> */}
                    <span className={__Styles.title}>logo</span>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: '请输入账号！' }]}
                        >
                            <Input
                                className={__Styles.userName}
                                placeholder="账号"
                                prefix={<UserName></UserName>}
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '请输入密码！' }]}
                        >
                            <Input.Password
                                className={__Styles.password}
                                placeholder="密码"
                                prefix={<Password></Password>}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button className={__Styles.button} type="primary" htmlType="submit">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                    <span className={__Styles.footer}>
                        Copyright © 2019 AdMaster Inc.All right reserved.
                    </span>
                </div>
            </div>
        </div>
    );
};
