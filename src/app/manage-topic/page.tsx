'use client'

import React, { useEffect, useState } from 'react';
import {
    Button,
    Form,
    Input,
    Select,
    DatePicker,
    Avatar,
    List,
    Modal,
    message,
    Spin,
    Popconfirm,
} from 'antd';
import type { PopconfirmProps } from 'antd';
import { createTopicApi, deleteTopicById, getProductApi, getTopicById, getTopicsApi, getTypesApi, updateTopicApi } from '@/api/apiClient';
import { pickFields } from '@/utils/common';
import Comment from '@/components/app.comment';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface DataTopicType {
    id: number;
    title: string;
    content: string;
    image: string | null;
    authorId: number;
    productId: number;
    createAt: string;
    updateAt: string;
    author: {
        name: string
    };
    product: {
        name: string
    },
    topicSubs: {
        content: string,
        id: number
    }[]
}

interface DataTopicEditFormType {
    title: string;
    content: string;
    productId: number;
    types: any;
}

function ManageError() {
    const [loading, setLoading] = useState(false);
    const [dataTopic, setDataTopic] = useState<DataTopicType[]>([]);
    const [dataTopicEdit, setDataTopicEdit] = useState<DataTopicEditFormType>();
    const [topicIdContent, setTopicIdContent] = useState<number>(1);
    const [topicIdEdit, setTopicIdEdit] = useState<number>(1);
    const [optionType, setOptionType] = useState([]);
    const [optionProduct, setOptionProduct] = useState([]);
    const [isModalContentTopicOpen, setIsModalContentTopicOpen] = useState(false);
    const [isModalEditTopicOpen, setIsModalEditTopicOpen] = useState(false);
    const [isModalCreateTopicOpen, setIsModalCreateTopicOpen] = useState(false);
    const [topicIdChooseDelete, setTopicIdChooseDelete] = useState<number>(1);
    const [form] = Form.useForm();

    const loadMoreData = async () => {
        setLoading(true);
        try {
            const data = await getTopicsApi();
            if (data.status == 200) {
                setDataTopic(data.data);
                setLoading(false);
            } else {
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMoreData();
        handleGetProductAndDoOptionProduct();
        handleGetTypeAndDoOptionType();
    }, []);

    const onFinishSearchTopic = (values: any) => {
        console.log('Received values of form: ', values);
    };

    const filterOption = (input: string, option?: { label: string; value: number }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const showModalContentTopic = (topicId: number) => {
        setTopicIdContent(topicId);
        setIsModalContentTopicOpen(true);
    };

    const showModalEditTopic = async (id: number) => {
        setDataTopicEdit(undefined);
        setIsModalEditTopicOpen(true);       
        const topic = await getTopicById(id);
        if (topic.status == 200) {
            const formData = {
                title: topic.data.title,
                content: topic.data.content,
                productId: topic.data.productId,
                types: topic.data.types.map((item: any) => item.typeId)
            }
            setDataTopicEdit(formData);
        }
        setTopicIdEdit(id);
    };

    const onCancelModalContentTopic = () => {
        setIsModalContentTopicOpen(false);
    };

    const onCancelModalEditTopic = () => {
        setIsModalEditTopicOpen(false);
    };

    const showModalCreateTopic = () => {
        setIsModalCreateTopicOpen(true);
    }

    const onSubmitCreateTopic = async (values: any) => {
        const formData = {
            ...values,
            types: (values.hasOwnProperty('types') && values.types) ? values.types : [],
            updateAt: new Date().toISOString()
        }

        try {
            const data = await createTopicApi(formData);
            if (data.status == 201) {
                message.success("Create topic successful");
                form.resetFields();
                setIsModalCreateTopicOpen(false);
                loadMoreData();
            } else {
                message.error(data?.message ? data?.message : 'Have error when create topic')
            }
        } catch (error: any) {
            message.error(error.response?.data?.message ? error.response?.data?.message : 'Have error when create topic');
        }
    };

    const onSubmitEditTopic = async (values: any) => {
        try {
            const topic = await getTopicById(topicIdEdit);
            if (topic.status == 200) {
                const formData = {
                    ...values,
                    types: (values.hasOwnProperty('types') && values.types.constructor === Array) ? values.types : [],
                    updateAt: new Date().toISOString()
                }
                const data = await updateTopicApi(topicIdEdit, formData);
                if (data.status == 202) {
                    message.success(data.message);
                    setIsModalEditTopicOpen(false);
                    loadMoreData();
                }
            }
        } catch (error: any) {
            if (error.response?.data?.message == 'Unauthorized') {
                message.error('Please login before!');
            } else {
                message.error(error.response?.data?.message ? error.response?.data?.message : 'Have error when create topic sub!');
            }
        }
    }

    const confirmDeleteTopic: PopconfirmProps['onConfirm'] = async () => {
        try {
            const data = await deleteTopicById(topicIdChooseDelete);
            if (data.status == 204) {
                message.success(data.message);
                loadMoreData();
            }
        } catch (error: any) {
            if (error.response?.data?.message == 'Unauthorized') {
                message.error('Please login before!');
            } else {
                message.error(error.response?.data?.message ? error.response?.data?.message : 'Have error when delete topic!');
            }
        }
    };

    const onCancelModalCreateTopic = () => {
        setIsModalCreateTopicOpen(false);
    };

    const handleGetProductAndDoOptionProduct = async () => {
        try {
            const data = await getProductApi();
            if (data.status == 200) {
                const formData = pickFields(data?.data, ['id', 'name']);
                setOptionProduct(formData);
            }
        } catch (error) {
            setOptionProduct([]);
        }
    }

    const handleGetTypeAndDoOptionType = async () => {
        try {
            const data = await getTypesApi();
            if (data.status == 200) {
                const formData = pickFields(data?.data, ['id', 'name']);
                setOptionType(formData);
            }
        } catch (error) {
            setOptionType([]);
        }
    }

    return (
        <>
            <div className="flex w-full pt-14">
                {/* Left column */}
                <div className="w-[300px] flex flex-col justify-start items-center">
                    <Form layout="vertical" variant="outlined" style={{ maxWidth: 260 }} onFinish={onFinishSearchTopic}>
                        <h2 className='font-bold text-2xl text-center my-5'>Search topic</h2>
                        <Form.Item
                            label="Search name:"
                            name="search"
                        >
                            <Input placeholder="Search with name..." />
                        </Form.Item>

                        <Form.Item
                            name="product"
                            label="Select Product:"
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
                            name="time"
                            label="Select Time:"
                        >
                            <RangePicker />
                        </Form.Item>

                        <Form.Item
                            name="type"
                            label="Select type:"
                        >
                            <Select
                                options={optionType}
                                placeholder='Select type'
                                allowClear
                                filterOption={filterOption}
                                mode="multiple"
                                showSearch
                                onFocus={handleGetTypeAndDoOptionType}
                            />
                        </Form.Item>

                        <Form.Item className='w-full flex justify-center'>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className='w-full border-t flex flex-col items-center justify-center pt-4'>
                        <h2 className='font-bold text-2xl text-center mt-2 mb-5'>Create topic</h2>
                        <Button type="primary" onClick={showModalCreateTopic}>
                            Create Topic
                        </Button>
                    </div>
                </div>
                {/* Right column  */}
                <div className="border-l grow">
                    <h2 className='font-bold text-2xl text-center my-5'>Result topic</h2>
                    <div className='px-5 pb-5 overflow-y-scroll h-screen'>
                        <div
                            id="scrollableDiv"
                            className='h-full overflow-auto px-4 border border-solid border-[rgba(140,140,140,0.35)]'
                        >

                            <List
                                dataSource={dataTopic}
                                loading={loading}
                                pagination={{
                                    pageSize: 10,
                                }}
                                renderItem={(item) => (
                                    <List.Item key={item.id}>
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.image} />}
                                            title={item.title}
                                            description={<p>{item.author?.name}</p>}
                                        />
                                        <Button onClick={() => showModalEditTopic(item.id)} type="link">Edit</Button>
                                        <Button onClick={() => showModalContentTopic(item.id)} type="link">Content</Button>
                                        <Button type="link">{item.product?.name}</Button>
                                        <Popconfirm
                                            title="Delete the Topic"
                                            description="Are you sure to delete this topic?"
                                            onConfirm={confirmDeleteTopic}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <Button onClick={() => setTopicIdChooseDelete(item.id)} type="link" className="p-2 pt-0" danger>delete</Button>
                                        </Popconfirm>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* Content topic */}
            <Modal title="Content of Topic"
                open={isModalContentTopicOpen}
                onCancel={onCancelModalContentTopic}
                footer={null}
            >
                <Comment topicId={topicIdContent} />
            </Modal>

            {/* Create topic */}
            <Modal
                title="Create A New Topic"
                open={isModalCreateTopicOpen}
                onCancel={onCancelModalCreateTopic}
                footer={null}
            >
                <Form form={form} layout="vertical" variant="outlined" style={{ maxWidth: 600 }} onFinish={onSubmitCreateTopic}>
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
            </Modal>

            {/* Edit topic */}
            <Modal
                title="Edit Topic"
                open={isModalEditTopicOpen}
                onCancel={onCancelModalEditTopic}
                footer={null}
            >
                {!dataTopicEdit ? <Spin /> :
                    <Form
                        layout="vertical"
                        variant="outlined"
                        style={{ maxWidth: 600 }}
                        onFinish={onSubmitEditTopic}
                    >
                        <Form.Item
                            label="Title:"
                            name="title"
                            rules={[
                                { required: true, message: 'Please enter title!' },
                                { max: 150, message: 'title is too long' }
                            ]}
                            initialValue={dataTopicEdit.title}
                        >
                            <Input placeholder="Enter title topic..." />
                        </Form.Item>

                        <Form.Item
                            label="Content:"
                            name='content'
                            initialValue={dataTopicEdit.content}
                        >
                            <TextArea rows={4} placeholder='Enter content topic...' />
                        </Form.Item>

                        <Form.Item
                            name="productId"
                            label="Product:"
                            initialValue={dataTopicEdit.productId}
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
                            initialValue={dataTopicEdit.types}
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
                }
            </Modal>
        </>

    )
}

export default ManageError;