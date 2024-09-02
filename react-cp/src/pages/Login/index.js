import React from 'react';
import './index.scss'
import { Button, Card, Form, Input } from 'antd';
import logo from '@/assets/Logo1.jpg'

const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const App = () => (
    <div className="login">
        <Card className="login-container">
            <img className="login-logo" alt="" src={logo} />
            <Form
                name="login"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Phone number"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!'
                        },
                        {
                            pattern: /^0[2-9]\d{8}$/,
                            message: 'Please input a valid phone number!'
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{
                        required: true,
                        message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{ span: 24 }}
                >
                    <Button type="primary" htmlType="submit" block>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    </div>
);

export default App;