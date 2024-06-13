'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { signin } from '@/api/auth/signin';
import { useUser } from '@/context/UserContext';

const Login: React.FC = () => {
  const [errMsg, setErrMsg] = useState<string>()
  const route = useRouter();
  const { setUserStore } = useUser();
  
  const onFinish = async (values: any) => {
    try {
        const res = await signin(values);
        setUserStore({ name: res.user.name });
        if(res.status == 200) {
            route.push('/');
        }
    } catch (error: any) {
        setErrMsg(error.response?.data?.message ? error.response?.data?.message: 'Have error when login!');
    }
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

                <div className='w-full text-red-600 text-base text-center'>{errMsg}</div>
            </Form>
        </div>
    </div>
  );
};

export default Login;