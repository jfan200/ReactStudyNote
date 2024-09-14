import React from 'react';
import './index.scss'
import {Button, Card, Form, Input, message} from 'antd';
import logo from '@/assets/Logo1.jpg'
import {useDispatch, useSelector} from "react-redux";
import {fetchLogin, setBasicAuth, setInfo} from "@/store/modules/user";
import {useNavigate} from "react-router-dom";


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = async (loginForm) => {
        const res = await dispatch(fetchLogin(loginForm));
        if (res.success) {
            // 跳转 homepage
            navigate('/');
            message.success(res.message);
        } else {
            // 如果不成功，显示错误提示
            message.error(res.message);
        }
    };

    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" alt="" src={logo}/>
                <Form
                    name="login"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    onFinish={onFinish}
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
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{
                            required: true,
                            message: 'Please input your password!'
                        }]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{span: 24}}
                    >
                        <Button type="primary" htmlType="submit" block>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login;