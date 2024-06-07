import { Button, Form, Input, Select } from "antd";

function EditTopic() {
    return (
        <Form layout="vertical" variant="outlined" style={{ maxWidth: 600 }} onFinish={onSubmitEditTopic}>
            <Form.Item
                label="Title:"
                name="title"
                rules={[
                    { required: true, message: 'Please enter title!' },
                    { max: 150, message: 'title is too long' }
                ]}
            >
                <Input placeholder="Enter title topic..." />
            </Form.Item>

            <Form.Item
                label="Content:"
                name='content'
            >
                <TextArea rows={4} placeholder='Enter content topic...' />
            </Form.Item>

            <Form.Item
                name="productId"
                label="Product:"
                rules={[
                    { required: true, message: 'Please select product!' }
                ]}
            >
                <Select
                    options={optionProduct}
                    placeholder='Select product'
                    allowClear
                    filterOption={filterOption}
                    onFocus={handleGetProductAndDoOptionProduct}
                />
            </Form.Item>

            <Form.Item
                name="types"
                label="Type:"
            >
                <Select
                    options={optionType}
                    placeholder='Select type'
                    allowClear
                    filterOption={filterOption}
                    mode="multiple"
                    onFocus={handleGetTypeAndDoOptionType}
                />
            </Form.Item>

            <Form.Item className='w-full flex justify-center'>
                <Button type="primary" htmlType="submit" loading={false}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default EditTopic;