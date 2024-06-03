'use client'

import { getTopicsApi, getTypesApi } from '@/api/apiClient';
import {
    Button,
    Form,
    Input,
    Select,
    DatePicker,
    Avatar,
    Divider,
    List,
    Skeleton,
    Modal,
} from 'antd';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const options = [
    { value: 1, label: 'AA' },
    { value: 2, label: 'BB' },
    { value: 3, label: 'CC' },
];

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
    }
}

function ManageError() {
    const [loading, setLoading] = useState(false);
    const [dataTopic, setDataTopic] = useState<DataTopicType[]>([]);
    const [listType, setListType] = useState([]);
    const [isModalEditTopicOpen, setIsModalEditTopicOpen] = useState(false);
    const [isModalCreateTopicOpen, setIsModalCreateTopicOpen] = useState(false);

    const loadMoreData = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        try {
            const data = await getTopicsApi();
            if(data.status == 200) {
                setDataTopic([...dataTopic, ...data.data]);
                setLoading(false);
            } else {
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
        }
    };

    const getListTypeApi = async () => {
        try {
            const data = await getTypesApi();
            setListType(data.data);
        } catch (error) {
            setListType([]);
        }
    }

    useEffect(() => {
        loadMoreData();
    }, []);

    useEffect(() => {
        getListTypeApi();
    }, [])

    const onFinishSearchTopic = (values: any) => {
        console.log('Received values of form: ', values);
    };

    const filterOption = (input: string, option?: { label: string; value: number }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const showModalEditTopic = (topicId: number) => {
        console.log("id topic: ", topicId);
        setIsModalEditTopicOpen(true);
    };

    const onSubmitEditTopic = () => {
        setIsModalEditTopicOpen(false);
    };

    const onCancelModalEditTopic = () => {
        setIsModalEditTopicOpen(false);
    };

    const showModalCreateTopic = () => {
        setIsModalCreateTopicOpen(true);
    }

    const onSubmitCreateTopic = (values: any) => {
        console.log("value create: ", values);
        setIsModalCreateTopicOpen(false);
    };

    const onCancelModalCreateTopic = () => {
        setIsModalCreateTopicOpen(false);
    };

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
                                options={options}
                                placeholder='Select product'
                                allowClear
                                filterOption={filterOption}
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
                                options={[]}
                                placeholder='Select type'
                                allowClear
                                filterOption={filterOption}
                                mode="multiple"
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
                            <InfiniteScroll
                                dataLength={dataTopic.length}
                                next={loadMoreData}
                                hasMore={dataTopic.length < 0}
                                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                                scrollableTarget="scrollableDiv"
                            >
                                <List
                                    dataSource={dataTopic}
                                    renderItem={(item) => (
                                        <List.Item key={item.id}>
                                            <List.Item.Meta
                                                avatar={<Avatar src={item.image} />}
                                                title={item.title}
                                                description={<p>{item.author?.name}</p>}
                                            />
                                            <Button type="primary">{item.product?.name}</Button>
                                            <Button onClick={() => showModalEditTopic(item.id)} type="link">Content</Button>
                                        </List.Item>
                                    )}
                                />
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>
            </div>
            {/* Edit topic */}
            <Modal title="Edit Topic" open={isModalEditTopicOpen} onOk={onSubmitEditTopic} onCancel={onCancelModalEditTopic}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>

            {/* Create topic */}
            <Modal
                title="Create A New Topic"
                open={isModalCreateTopicOpen}
                onCancel={onCancelModalCreateTopic}
                footer={null}
            >
                <Form layout="vertical" variant="outlined" style={{ maxWidth: 600 }} onFinish={onSubmitCreateTopic}>
                    <Form.Item
                        label="Title:"
                        name="tile"
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
                        name="type"
                        label="Type:"
                    >
                        <Select
                            options={listType}
                            placeholder='Select type'
                            allowClear
                            filterOption={filterOption}
                            mode="multiple"
                        />
                    </Form.Item>

                    <Form.Item className='w-full flex justify-center'>
                        <Button type="primary" htmlType="submit" loading={false}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default ManageError;