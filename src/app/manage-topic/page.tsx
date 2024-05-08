'use client'

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
    Modal
} from 'antd';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const { RangePicker } = DatePicker;

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

    const loadMoreData = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        fetch('http://localhost:3004/v1/topics/')
            .then((res) => res.json())
            .then((body) => {
                console.log("topics: ", body.data);
                
                setDataTopic([...dataTopic, ...body.data]);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
        // try {
        //     const dataTopics = await getTocpicsApi();
        //     if(dataTopics) {
        //         setDataTopic([...data, ...dataTopics.data]);
        //         setLoading(false);
        //     } else {
        //         setLoading(false);
        //     }
        // } catch (error) {
        //     setLoading(false);
        // }
    };

    useEffect(() => {
        loadMoreData();
    }, []);

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    const filterOption = (input: string, option?: { label: string; value: number }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = (topicId: number) => {
        setIsModalOpen(true);
        console.log("id topic: ", topicId);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="flex w-full pt-14">
                {/* Left column */}
                <div className="w-[300px] flex justify-center items-start">
                    <Form layout="vertical" variant="outlined" style={{ maxWidth: 260 }} onFinish={onFinish}>
                        <h2 className='font-bold text-2xl text-center my-5'>Search topic</h2>
                        <Form.Item
                            label="Search name:"
                            name="search"
                        >
                            <Input placeholder="Search with name..." />
                        </Form.Item>

                        <Form.Item
                            name="Product"
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

                        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
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
                                            <Button onClick={() => showModal(item.id)} type="link">Content</Button>
                                        </List.Item>
                                    )}
                                />
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>
            </div>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    )
}

export default ManageError;