'use client'

import {
    Button,
    Form,
    Input,
    Select,
} from 'antd';
import { ROLE } from '@/constants/common';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

const departments = [
    { value: 1, label: 'TE' },
    { value: 2, label: 'ME' },
    { value: 3, label: 'EE' },
];

function CreateUser() {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    const filterOption = (input: string, option?: { label: string; value: number }) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
        <div className='w-[600px] border mb-8'>
            <Form {...formItemLayout} variant="filled" style={{ minWidth: 600 }} onFinish={onFinish}>
                <h2 className='font-bold text-2xl text-center my-5'>Create user</h2>
                <Form.Item
                    label="Code"
                    name="code"
                    rules={[
                        { required: true, message: 'Please enter code!' },
                        { max: 10, message: 'Code is too long' }
                    ]}
                >
                    <Input placeholder="Enter code..." />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: 'Please enter password!' },
                        { max: 30, message: 'password is too long' }
                    ]}
                >
                    <Input placeholder="Enter password..." />
                </Form.Item>

                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        { required: true, message: 'Please enter name!' },
                        { max: 50, message: 'Name is too long!' }
                    ]}
                >
                    <Input placeholder="Enter name..." />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please enter email!' },
                        { type: 'email', message: 'This is not a email!' }
                    ]}
                >
                    <Input placeholder="Enter email..." />
                </Form.Item>

                <Form.Item
                    label="Department"
                    name="department"
                    rules={[{ required: true, message: 'Please select department!' }]}
                >
                    <Select 
                        options={departments} 
                        placeholder='Select department' 
                        showSearch
                        filterOption={filterOption}
                    />
                </Form.Item>

                <Form.Item
                    label="Role"
                    name="role"
                    rules={[{ required: true, message: 'Please select role!' }]}
                >
                    <Select
                        options={ROLE}
                        defaultValue={ROLE[0]}
                        placeholder='Select role'
                    />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default CreateUser;