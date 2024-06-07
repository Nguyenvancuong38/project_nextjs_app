import { createTopicSub, deleteTopicSubById, getTopicById, updateTopicSub } from "@/api/apiClient";
import type { PopconfirmProps } from 'antd';
import { Avatar, Button, Form, Input, Spin, message, Popconfirm } from "antd";
import { useEffect, useState } from "react";

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
        id: number,
        author: {
            name: string
        }
    }[]
}

function Comment({ topicId }: any) {
    const [dataTopicDetail, setDataTopicDetail] = useState<DataTopicType>();
    const [topicSubIdChooseEdit, setTopicSubIdChooseEdit] = useState<number>();
    const [topicSubIdChooseDelete, setTopicSubIdChooseDelete] = useState<number>();
    const [form] = Form.useForm();

    const loadDataTopicDetail = async (id: number) => {
        try {
            const topic = await getTopicById(id);
            if (topic.status == 200) {
                setDataTopicDetail(topic.data);
            }
        } catch (error) {
            message.error('Get topic not successful');
            setDataTopicDetail(undefined);
        }
    };

    const onSubmitCreateTopicSub = async (values: any) => {
        const formData = {
            ...values,
            image: null,
            topicId: topicId,
            updateAt: new Date().toISOString()
        }

        try {
            const data = await createTopicSub(formData);
            if (data.status == 201) {
                message.success(data.message);
                loadDataTopicDetail(topicId);
                form.resetFields();
            }
        } catch (error: any) {
            if (error.response?.data?.message == 'Unauthorized') {
                message.error('Please login before!');
            } else {
                message.error(error.response?.data?.message ? error.response?.data?.message : 'Have error when create topic sub!');
            }
        }
    };

    const onSubmitEditTopicSub = async (values: any) => {
        if (values) {
            const formData = {
                ...values,
                image: null,
                topicId: topicId,
                updateAt: new Date().toISOString()
            }

            try {
                const data = await updateTopicSub(topicSubIdChooseEdit, formData);
                if (data.status == 202) {
                    message.success(data.message);
                    loadDataTopicDetail(topicId);
                }
            } catch (error: any) {
                if (error.response?.data?.message == 'Unauthorized') {
                    message.error('Please login before!');
                } else {
                    message.error(error.response?.data?.message ? error.response?.data?.message : 'Have error when create topic sub!');
                }
            }
        }
        setTopicSubIdChooseEdit(undefined);
    }

    const confirmDeleteTopicSub: PopconfirmProps['onConfirm'] = async () => {
        try {
            const data = await deleteTopicSubById(topicSubIdChooseDelete);
            if (data.status == 204) {
                loadDataTopicDetail(topicId);
                message.success(data.message);
            }
        } catch (error: any) {
            if (error.response?.data?.message == 'Unauthorized') {
                message.error('Please login before!');
            } else {
                message.error(error.response?.data?.message ? error.response?.data?.message : 'Have error when delete topic sub!');
            }
        }
    };

    useEffect(() => {
        loadDataTopicDetail(topicId);
    }, [topicId])

    if (!dataTopicDetail) {
        return <div className="flex justify-center items-center w-full h-20"><Spin /></div>;
    }

    return (
        <div>
            <h2 className='w-full text-center font-bold mb-3'>{dataTopicDetail?.title}</h2>
            <div className="flex flex-row w-full my-4">
                <div className="mr-4"><Avatar src='' /></div>
                <div className="grow">
                    <h2 className="h-8 font-bold flex items-center">{dataTopicDetail?.author?.name}</h2>
                    <p className="border p-4 rounded-md">{dataTopicDetail?.content}</p>
                </div>
            </div>

            {dataTopicDetail?.topicSubs.map(item => (
                <div key={item.id} className="flex flex-row w-full my-4">
                    <div className="mr-4"><Avatar src='' /></div>
                    <div className="grow">
                        <h2 className="h-8 font-bold flex items-center">{item?.author?.name}</h2>
                        <div>
                            <Form layout="vertical" variant="outlined" style={{ maxWidth: 600 }} onFinish={onSubmitEditTopicSub}>
                                <Form.Item
                                    style={{ marginBottom: 8 }}
                                    name='content'
                                    initialValue={item.content}
                                >
                                    <Input.TextArea
                                        autoSize
                                        readOnly={topicSubIdChooseEdit != item.id}
                                        autoFocus={topicSubIdChooseEdit == item.id}
                                        placeholder='Enter content ...'
                                    />
                                </Form.Item>

                                <div className={topicSubIdChooseEdit != item.id ? 'flex' : 'hidden'}>
                                    <Button onClick={() => setTopicSubIdChooseEdit(item.id)} type="link" className="p-2 pt-0 mr-3">edit</Button>
                                    <Popconfirm
                                        title="Delete the Comment"
                                        description="Are you sure to delete this Comment?"
                                        onConfirm={confirmDeleteTopicSub}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button onClick={() => setTopicSubIdChooseDelete(item.id)} type="link" className="p-2 pt-0" danger>delete</Button>
                                    </Popconfirm>
                                </div>

                                <Form.Item className={topicSubIdChooseEdit == item.id ? 'flex' : 'hidden'} style={{ marginBottom: 4 }}>
                                    <Button className="mr-4" onClick={() => setTopicSubIdChooseEdit(undefined)}>
                                        Cancel
                                    </Button>
                                    <Button type="primary" htmlType="submit" loading={false}>
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            ))}

            <Form form={form} layout="vertical" variant="outlined" style={{ maxWidth: 600 }} onFinish={onSubmitCreateTopicSub}>
                <Form.Item
                    label="Add answer:"
                    name='content'
                >
                    <TextArea rows={4} placeholder='Enter content ...' />
                </Form.Item>
                <Form.Item className='w-full flex justify-center'>
                    <Button type="primary" htmlType="submit" loading={false}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Comment;