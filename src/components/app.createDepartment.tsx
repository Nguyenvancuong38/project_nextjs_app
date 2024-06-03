'use client'

import {
    Button,
    Form,
    Input,
    message
} from 'antd';
import { createDepartmentApi } from '@/api/apiClient';

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

function CreateDepartment() {
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        try {
            const data = await createDepartmentApi(values);
            if (data.status == 201) {
                message.success('Create department successful');
                form.resetFields();
            } else {
                message.error(data?.message ? data?.message : 'Have error when create department')
            }
        } catch (error) {
            message.error('Have error when create department');
        }
    };

    return (
        <div className='w-[600px] border my-8'>
            <Form {...formItemLayout} form={form} variant="outlined" style={{ minWidth: 600 }} onFinish={onFinish}>
                <h2 className='font-bold text-2xl text-center my-5'>Create department</h2>
                
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
                    label="Description"
                    name="description"
                    rules={[
                        { max: 100, message: 'description is too long' }
                    ]}
                >
                    <Input.TextArea showCount maxLength={100} />
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

export default CreateDepartment;