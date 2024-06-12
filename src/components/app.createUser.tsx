'use client'

import {
    Button,
    Form,
    Input,
    Select,
    message,
} from 'antd';
import { ROLE } from '@/constants/common';
import { useState } from 'react';
import { createUserApi, getDepartmentApi, getProductApi } from '@/api/apiClient';
import { pickFields } from '@/utils/common';
import { useRouter } from 'next/navigation'

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

function CreateUser() {
    const [form] = Form.useForm();
    const route = useRouter();
    const [optionDepartment, setOptionDepartment] = useState([]);
    const [optionProduct, setOptionProduct] = useState([]);
    const onFinish = async (values: any) => {
        try {
            const formData = {
                ...values,
                updateAt: new Date().toISOString()
            }
            const data = await createUserApi(formData);
            if(data.status == 201) {
                message.success('Create user successful');
                form.resetFields();
                route.push('/manage-data/user');
            }  else {
                message.error(data?.message ? data?.message : 'Have error when create user');
            }
        } catch (error: any) {
            message.error(error.response?.data?.message ? error.response?.data?.message: 'Have error when create user');
        }
    };

    const filterOption = (input: string, option?: { label: string; value: number }) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const handleGetDepartmentAndDoOptionDepartment = async () => {
        try {
            const data = await getDepartmentApi();
            if(data.status == 200) {
                const formData = pickFields(data?.data, ['id', 'name']);
                setOptionDepartment(formData);
            }
        } catch (error) {
            setOptionDepartment([]);
        }
    }

    const handleGetProductAndDoOptionProduct = async () => {
        try {
            const data = await getProductApi();
            if(data.status == 200) {
                const formData = pickFields(data?.data, ['id', 'name']);
                setOptionProduct(formData);
            }
        } catch (error) {
            setOptionProduct([]);
        }
    }

    return (
        <div className='w-[600px] border mb-8'>
            <Form {...formItemLayout} form={form} variant="outlined" style={{ minWidth: 600 }} onFinish={onFinish}>
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
                    name="departmentId"
                    rules={[{ required: true, message: 'Please select department!' }]}
                >
                    <Select 
                        options={optionDepartment} 
                        placeholder='Select department' 
                        showSearch
                        filterOption={filterOption}
                        onFocus={handleGetDepartmentAndDoOptionDepartment}
                    />
                </Form.Item>

                <Form.Item
                    label="Product"
                    name="productIds"
                >
                    <Select 
                        options={optionProduct} 
                        placeholder='Select product' 
                        mode="multiple"
                        showSearch
                        allowClear
                        filterOption={filterOption}
                        onFocus={handleGetProductAndDoOptionProduct}
                    />
                </Form.Item>

                <Form.Item
                    label="Role"
                    name="role"
                    rules={[{ required: true, message: 'Please select role!' }]}
                >
                    <Select
                        options={ROLE}
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