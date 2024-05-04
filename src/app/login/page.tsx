'use client'

import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

const Login: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div className='w-full h-screen flex justify-center items-center pt-14'>
        <div className='w-[600px] h-[420px] border flex justify-center items-center'>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                style={{minWidth: 420}}
            >
                <h2 className='font-bold text-2xl text-center my-5'>Login</h2>
                <Form.Item
                    name="code"
                    rules={[
                        { required: true, message: 'Please input your Code!' },
                        {max: 10, message: 'Code is too long!'}
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Code" />
                </Form.Item>
                
                <div className='w-full mb-8'></div>
                
                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: 'Please input your Password!' },
                        {max: 30, message: 'Password is too long!'}
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                
                <div className='w-full mb-8'></div>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </div>
  );
};

export default Login;