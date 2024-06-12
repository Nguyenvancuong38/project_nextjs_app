'use client'

import { deleteUserByIdApi, getDepartmentApi, getProductApi, getUserApi, getUserByIdApi, updateUserByIdApi } from '@/api/apiClient';
import { ROLE } from '@/constants/common';
import { pickFields } from '@/utils/common';
import { Button, Form, Input, Modal, Popconfirm, Select, Space, Spin, Table, message } from 'antd';
import type { TableProps } from 'antd';
import type { PopconfirmProps } from 'antd';
import { useEffect, useState } from 'react';

interface DataType {
    key: number;
    name: string;
    code: string;
    email: string;
    department: string;
    role: string;
}

interface FormDataUserType {
    code: string,
    name: string,
    email: string,
    departmentId: number,
    productIds: number[],
    role: string
}

function User() {
    const [listUser, setListUser] = useState<DataType[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isModalEditUserOpen, setIsModalEditUserOpen] = useState<boolean>(false);
    const [dataUserEdit, setDataUserEdit] = useState<FormDataUserType>();
    const [idUserChoose, setIdUserChoose] = useState<number>(0);
    const [optionDepartment, setOptionDepartment] = useState([]);
    const [optionProduct, setOptionProduct] = useState([]);

    const filterOption = (input: string, option?: { label: string; value: number }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const handleGetDepartmentAndDoOptionDepartment = async () => {
        try {
            const data = await getDepartmentApi();
            if (data.status == 200) {
                const formData = pickFields(data?.data, ['id', 'name']);
                setOptionDepartment(formData);
            }
        } catch (error) {
            setOptionDepartment([]);
        }
    }

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

    const fetchDataUser = async () => {
        setIsLoading(true);
        try {
            const data = await getUserApi();
            if (data.status == 200) {
                const formData = data.data.map((item: any) => {
                    return {
                        key: item.id,
                        name: item.name,
                        code: item.code,
                        email: item.email,
                        department: item.department?.name,
                        role: item.role
                    }
                })
                setListUser(formData);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            setListUser([]);
        }
    }

    useEffect(() => {
        fetchDataUser();
        handleGetDepartmentAndDoOptionDepartment();
        handleGetProductAndDoOptionProduct();
    }, [])

    const onCancelModalEditUser = () => {
        setIsModalEditUserOpen(false);
    };

    const showModalEditUser = async (id: number) => {
        setDataUserEdit(undefined);
        setIsModalEditUserOpen(true);
        const data = await getUserByIdApi(id);
        if (data.status == 200) {
            const formData = {
                code: data.data.code,
                email: data.data.email,
                name: data.data.name,
                departmentId: data.data.departmentId,
                productIds: data.data.products.map((item: any) => item.productId),
                role: data.data.role
            }
            setDataUserEdit(formData);
        }
        setIdUserChoose(id);
    };

    const onSubmitEditUser = async (values: any) => {
        const formData = {
            ...values,
            updateAt: new Date().toISOString()
        }

        try {
            const data = await updateUserByIdApi(idUserChoose, formData);
            if (data.status == 202) {
                setIsModalEditUserOpen(false);
                message.success('Update user successful');
                fetchDataUser();
            } else {
                message.error(data?.message ? data?.message : 'Have error when update user');
            }
        } catch (error: any) {
            if (error.response?.data?.message == 'Unauthorized') {
                message.error('Please login before!');
            } else {
                message.error(error.response?.data?.message ? error.response?.data?.message : 'Have error when update user!');
            }
        }

    }

    const confirmDeleteUser: PopconfirmProps['onConfirm'] = async () => {
        try {
            const data = await deleteUserByIdApi(idUserChoose);
            if (data.status == 204) {
                message.success(data.message);
                fetchDataUser();
            }
        } catch (error: any) {
            if (error.response?.data?.message == 'Unauthorized') {
                message.error('Please login before!');
            } else {
                message.error(error.response?.data?.message ? error.response?.data?.message : 'Have error when delete user!');
            }
        }
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type='link' onClick={() => showModalEditUser(record.key)}>Edit</Button>
                    <Popconfirm
                        title="Delete the Comment"
                        description="Are you sure to delete this Comment?"
                        onConfirm={confirmDeleteUser}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type='link' danger onClick={() => setIdUserChoose(record.key)}>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <div className='pt-14 h-screen'>
                <Table
                    columns={columns}
                    dataSource={listUser}
                    loading={isLoading}
                />
            </div>

            <Modal
                title="Edit User"
                open={isModalEditUserOpen}
                onCancel={onCancelModalEditUser}
                footer={null}
            >
                {!dataUserEdit ? <div className='w-full flex justify-center items-center h-20'><Spin /></div> :
                    <Form layout='vertical' variant="outlined" style={{ maxWidth: 600 }} onFinish={onSubmitEditUser}>
                        <Form.Item
                            label="Code"
                            name="code"
                            rules={[
                                { required: true, message: 'Please enter code!' },
                                { max: 10, message: 'Code is too long' }
                            ]}
                            initialValue={dataUserEdit.code}
                        >
                            <Input placeholder="Enter code..." />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                { max: 30, message: 'password is too long' }
                            ]}
                        >
                            <Input placeholder="Enter password..." />
                        </Form.Item>

                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                { required: true, message: 'Please enter name!' },
                                { max: 50, message: 'Name is too long!' }
                            ]}
                            initialValue={dataUserEdit.name}
                        >
                            <Input placeholder="Enter name..." />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Please enter email!' },
                                { type: 'email', message: 'This is not a email!' }
                            ]}
                            initialValue={dataUserEdit.email}
                        >
                            <Input placeholder="Enter email..." />
                        </Form.Item>

                        <Form.Item
                            label="Department"
                            name="departmentId"
                            rules={[{ required: true, message: 'Please select department!' }]}
                            initialValue={dataUserEdit.departmentId}
                        >
                            <Select
                                options={optionDepartment}
                                placeholder='Select department'
                                showSearch
                                filterOption={filterOption}
                                onFocus={handleGetDepartmentAndDoOptionDepartment}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Product"
                            name="productIds"
                            initialValue={dataUserEdit.productIds}
                        >
                            <Select
                                options={optionProduct}
                                placeholder='Select product'
                                mode="multiple"
                                showSearch
                                allowClear
                                filterOption={filterOption}
                                onFocus={handleGetProductAndDoOptionProduct}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Role"
                            name="role"
                            rules={[{ required: true, message: 'Please select role!' }]}
                            initialValue={dataUserEdit.role}
                        >
                            <Select
                                options={ROLE}
                                placeholder='Select role'
                            />
                        </Form.Item>

                        <Form.Item className='flex justify-center'>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                }
            </Modal>
        </>
    )
}

export default User;