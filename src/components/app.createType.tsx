'use client'

import { createTypeApi, getTopicsApi } from '@/api/apiClient';
import { pickFields } from '@/utils/common';
import {
    Button,
    Form,
    Input,
    Select,
    message,
} from 'antd';
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

function CreateType() {
    const [form] = Form.useForm();
    const [topicOption, setTopicOption] = useState([]);

    const onFinish = async (values: any) => {
        try {
            const data = await createTypeApi(values);
            if(data.status == 201) {
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

    const handleGetTopicAndDoOptionTopic = async () => {
        try {
            const data = await getTopicsApi();
            if(data.status == 200) {
                const formData = pickFields(data?.data, ['id', 'title']);
                setTopicOption(formData);
            }
        } catch (error) {
            setTopicOption([]);
        }
    }

    return (
        <div className='w-[600px] border mb-8'>
            <Form {...formItemLayout} form={form} variant="outlined" style={{ minWidth: 600 }} onFinish={onFinish}>
                <h2 className='font-bold text-2xl text-center my-5'>Create type</h2>
                
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        { required: true, message: 'Please enter name!' },
                        { max: 30, message: 'name is too long' }
                    ]}
                >
                    <Input placeholder="Enter name..." />
                </Form.Item>

                <Form.Item
                    label="Topic"
                    name="topics"
                >
                    <Select 
                        options={topicOption} 
                        placeholder='Select topic' 
                        mode="multiple"
                        allowClear
                        showSearch
                        filterOption={filterOption}
                        onFocus={handleGetTopicAndDoOptionTopic}
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

export default CreateType;