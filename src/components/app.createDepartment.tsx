'use client'

import {
    Button,
    Form,
    Input,
} from 'antd';

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
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <div className='w-[600px] border my-8'>
            <Form {...formItemLayout} variant="filled" style={{ minWidth: 600 }} onFinish={onFinish}>
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