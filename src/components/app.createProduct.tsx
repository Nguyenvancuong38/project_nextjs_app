'use client'

import {
    Button,
    Form,
    Input,
    Select,
    message,
} from 'antd';
import { pickFields } from '@/utils/common';
import { createProductApi, getUserApi } from '@/api/apiClient';
import { useState } from 'react';

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

function CreateProduct() {
    const [optionsUser, setOptionsUser] = useState([]);
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        try {
            const formData = {
                ...values,
                updateAt: new Date().toISOString() 
            }
            const data = await createProductApi(formData);
            if (data.status == 201) {
                form.resetFields();
                message.success('Create product successful');
            } else {
                message.error(data?.message ? data?.message : 'Have error when create product')
            }
        } catch (error) {
            message.error('Have error when create product');
        }
    };

    const filterOption = (input: string, option?: { label: string; value: number }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const handleGetUserAndDoOptionUser = async () => {
        try {
            const data = await getUserApi();
            if (data.status == 200) {
                const dataAfterFilter = pickFields(data.data, ['id', 'name']);
                setOptionsUser(dataAfterFilter);
            }
        } catch (error) {
            setOptionsUser([]);
        }
    }

    return (
        <div className='w-[600px] border mb-8'>
            <Form {...formItemLayout} form={form} variant="outlined" style={{ minWidth: 600 }} onFinish={onFinish}>
                <h2 className='font-bold text-2xl text-center my-5'>Create product</h2>

                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        { required: true, message: 'Please enter name!' },
                        { max: 50, message: 'name is too long' }
                    ]}
                >
                    <Input placeholder="Enter name..." />
                </Form.Item>

                <Form.Item
                    label="Users"
                    name="userIds"
                >
                    <Select
                        options={optionsUser}
                        placeholder='Select users'
                        mode="multiple"
                        allowClear
                        filterOption={filterOption}
                        onFocus={handleGetUserAndDoOptionUser}
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

export default CreateProduct;