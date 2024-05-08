'use client'

import {
    Button,
    Form,
    Input,
    Select,
} from 'antd';

const options = [
    { value: 1, label: 'AA' },
    { value: 2, label: 'BB' },
    { value: 3, label: 'CC' },
];

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
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    const filterOption = (input: string, option?: { label: string; value: number }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
        <div className='w-[600px] border mb-8'>
            <Form {...formItemLayout} variant="outlined" style={{ minWidth: 600 }} onFinish={onFinish}>
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
                    name="user"
                >
                    <Select 
                        options={options} 
                        placeholder='Select users' 
                        mode="multiple"
                        allowClear
                        filterOption={filterOption}
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