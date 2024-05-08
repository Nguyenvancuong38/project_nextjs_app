import React from 'react';
import CreateUser from '@/components/app.createUser';
import { Metadata } from 'next';
import CreateDepartment from '@/components/app.createDepartment';
import CreateProduct from '@/components/app.createProduct';

export const metadata: Metadata = {
    title: "Create data",
    description: "Create data",
  };

const Create: React.FC = () => {
    return (
        <div className='w-full flex flex-col justify-center items-center pt-14'>
            <CreateDepartment />
            <CreateProduct />
            <CreateUser />
        </div>
    );
} 

export default Create;